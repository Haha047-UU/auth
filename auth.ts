import NextAuth from "next-auth"
import "next-auth/jwt"

import GitHub from "next-auth/providers/github"
import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"
import vercelKVDriver from "unstorage/drivers/vercel-kv"
import { UnstorageAdapter } from "@auth/unstorage-adapter"
import type { NextAuthConfig } from "next-auth"

const storage = createStorage({
  driver: process.env.VERCEL
    ? vercelKVDriver({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
      env: false,
    })
    : memoryDriver(),
})

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  adapter: UnstorageAdapter(storage),
  providers: [
    GitHub
  ],
  session: {
    strategy: "jwt",
  },
  debug: true,
  basePath: "/api/auth",
  callbacks: {
    session({ session, token }) {
      if (token.access_token) {
        session.access_token = token.access_token as string// Put the provider's access token in the session so that we can access it client-side and server-side with `auth()`
      }
      return session
    },
    jwt({ token, account, profile }) {
      if (account) {
        token.access_token = account.access_token // Store the provider's access token in the token so that we can put it in the session in the session callback above
      }

      return token
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
  },
  experimental: {
    enableWebAuthn: true,
  }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

