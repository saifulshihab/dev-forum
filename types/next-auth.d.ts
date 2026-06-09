import "next-auth";
import { UserType } from "./generated/prisma";

declare module "next-auth" {
  interface DefaultUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    type?: UserType | null;
    provider?: string;
    accessToken?: string;
  }
  interface Session {
    user?: DefaultUser;
  }
}
