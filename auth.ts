import { getServerSession, NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { UserType } from "./generated/prisma";
import { getUsername } from "./lib/actions";
import { env } from "./lib/constants";
import prisma from "./lib/prisma";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
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
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      profile(profile, tokens) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          accessToken: tokens.access_token
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        // Email not found, user is not allowed to sign in
        return false;
      }

      // Create the user if not registered before
      const userData = await prisma.user.upsert({
        where: { email: user.email },
        create: {
          fullName: user.name || "",
          email: user.email,
          dpUrl: user.image
        },
        update: {}
      });

      if (!userData.username) {
        // Create username based on user full name
        const usernameString = user.name
          ? user.name.toLowerCase().replace(/\s/g, "")
          : "";
        const username = await getUsername(usernameString);

        await prisma.user.update({
          where: { id: userData.id },
          data: { username }
        });
      }

      if (!userData) return false;
      user.id = userData.id;
      user.type = userData.type;
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (!!user) {
        token.id = user.id;
        token.type = user.type;
        token.provider = account?.provider;
        token.accessToken = (user as any)?.accessToken;
      }
      if (trigger === "update" && session?.type) {
        token.type = session.type;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.type = token.type as UserType;
          session.user.provider = token.provider as string;
          session.user.accessToken = token.accessToken as string;
        }
      }
      return session;
    }
  }
};

export async function authCheck() {
  const session = await getServerSession(nextAuthOptions);
  if (session === null) {
    return { isAuthenticated: false, user: null };
  }
  return { isAuthenticated: true, user: session.user };
}
