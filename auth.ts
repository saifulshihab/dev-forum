import { getServerSession, NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { redirect } from "next/navigation";
import prisma from "./lib/prisma";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          accessToken: tokens.access_token
        };
      }
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/signin"
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        // email not found, user is not allowed to sign in
        return false;
      }
      // create the user if not registered before
      const userData = await prisma.user.upsert({
        where: { email: user.email },
        create: {
          fullName: user.name || "",
          email: user.email
        },
        update: {}
      });

      if (!userData) return false;
      user.id = userData.id;
      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        token.accessToken = (user as any)?.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        (session.user as any).id = token.id as string;
        (session.user as any).accessToken = token.accessToken as string;
      }
      return session;
    }
  }
};

export async function authCheck() {
  const session = await getServerSession(nextAuthOptions);
  if (!session) redirect("/signin");
  return { user: session.user };
}
