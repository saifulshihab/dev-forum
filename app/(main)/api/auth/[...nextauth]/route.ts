import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || ""
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
      // email found
      // check if user with the email is already registered
      const userData = await prisma.user.findUnique({
        where: { email: user.email }
      });

      if (userData) {
        // user is already registered
        // update user id with UUID from db
        user.id = userData?.id as string;
        return true;
      } else {
        // user is not registered, create a new user
        const newUser = await prisma.user.create({
          data: {
            fullName: user.name || "",
            email: user.email
          }
        });
        user.id = newUser?.id as string;
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
