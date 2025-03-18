import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, profile }) { // accountを削除
      try {
        if (!profile?.sub) {
          console.error("Google profile does not contain 'sub'.");
          return false;
        }

        const userId = profile.sub; // Googleの一意なIDを使用

        const existingUser = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!existingUser) {
          // user.emailがnullまたはundefinedの場合の対処
          const email = user.email || ""; // デフォルトで空文字を設定

          await prisma.user.create({
            data: {
              id: userId,
              email,
              name: user.name || "", // nameが空の場合も空文字を設定
              image: user.image || "", // imageが空の場合も空文字を設定
            },
          });
          console.log(`Created new user: ${userId}`);
        }
        return true;
      } catch (error) {
        console.error("Error saving user to database:", error);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        // GoogleのサブIDをtokenに設定
        token.id = user.id; // もしuser.idがある場合、それを設定
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string; // token.idをsession.user.idに設定
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // サインイン後にリダイレクトするURLの設定
      if (url === "/auth/signin") {
        return `${baseUrl}/search`;
      }
      return url;
    },
  },
};