import { Account, NextAuthOptions, Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "./prisma";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        return false;
      }
      try {
        console.log("Profile: ", profile);

        await prisma.user.upsert({
          where: {
            email: profile.email,
            googleId: account?.provider === "google" ? profile.sub : undefined,
            githubId: account?.provider === "github" ? profile.sub : undefined,
          },
          create: {
            email: profile.email,
            image: profile.picture,
            name: profile.name,
            googleId: account?.provider === "google" ? profile.sub : undefined,
            githubId: account?.provider === "github" ? profile.sub : undefined,
          },
          update: {
            name: profile.name,
            image: profile.picture,
          },
        });
        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT,
      user: any,
      account: Account | null,
    }) {
      if (account) {
        token.accessToken = account.access_token;
        if(user) {
          token.id = user.id;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
