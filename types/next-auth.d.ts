import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {

  // Extend session to hold the access_token
  interface Session extends DefaultSession {
    access_token: string;
  }

  // Extend token to hold the access_token before it gets put into session
  interface JWT {
    access_token: string & DefaultJWT;
  }
}
