import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import authOptions from "./authOpts";

const authHandler = NextAuth(authOptions as NextAuthOptions);

export { authHandler as GET, authHandler as POST };
