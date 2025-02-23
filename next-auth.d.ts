import { DefaultSession, DefaultUserm, Profile } from "next-auth";

declare module "next-auth" {
  interface Profile extends Profile {
    id: string;
    picture: string;
  }
  interface Session {
    user: {
      id: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
  }
}
