import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "@auth/core/jwt"

declare module "next-auth" {

  interface Session {
    access_token: string & DefaultSession
  }

  interface JWT {
    sccess_token: string & DefaultJWT
  }
}