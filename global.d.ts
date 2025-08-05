import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      accessToken?: string;
      provider?: string;
    } & DefaultSession["user"];
  }
}
