import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import UserModel from "@/models/User/User";

import startDb from "@/lib/db";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, _req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await startDb();

        const user = await UserModel.findOne({ email }).populate("role");
        if (!user) throw Error("Email not found");

        const pwdMatch = await user.comparePassword(password);
        if (!pwdMatch) throw Error("email / password mismatch");

        const aa = {
          name: user.name,
          email: user.email,
          role: user.role,
          id: String(user._id),
        };

        return aa;
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
      }

      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: any }).role = token.role as any;
      }
      return session;
    },
  },
};

export default authOptions;
