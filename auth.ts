import NextAuth from "next-auth"

import type { NextAuthConfig } from "next-auth"
import Okta from "@auth/core/providers/okta";

<<<<<<< HEAD
const storage = createStorage({
  driver: process.env.VERCEL
    ? vercelKVDriver({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
      env: false,
    })
    : memoryDriver(),
})

const config = {
  theme: {
    logo: "https://authjs.dev/img/logo-sm.png"
  },
  adapter: UnstorageAdapter(storage),
=======
export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
>>>>>>> 470c84aaf7c7c5a2a77a1f4fef8554face941a38
  providers: [
    Okta({
      clientId: "myClientIdhere",
      clientSecret: "mySecretHere",
      issuer: "https://path.to.your.okta.instance.com/oauth2/default",
      // Put in a an empty `state` because Next Auth doesn't appear to be specifying this
      // properly, and Okta doesn't like a missing state param
      authorization: "https://path.to.your.okta.instance.com/oauth2/default/v1/authorize?response_type=code&state=e30="
    })
  ],
  session: {
    strategy: "jwt",
  },
  debug: true,
  callbacks: {
    session({ session, token }) {
      console.log(`Auth Sess = ${JSON.stringify(session)}`)
      console.log(`Auth Tok = ${JSON.stringify(token)}`)
      if (token.access_token) {
        session.access_token = token.access_token // Put the provider's access token in the session so that we can access it client-side and server-side with `auth()`
      }
      return session
    },
    jwt({ token, account, profile }) {
      console.log(`Auth JWT Tok = ${JSON.stringify(token)}`)
      console.log(`Router Auth JWT account = ${JSON.stringify(account)}`)

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
  }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
