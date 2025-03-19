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
  // セッション設定を追加
  session: {
    strategy: "jwt", // JWTを使用してセッションを管理
    maxAge: 30 * 24 * 60 * 60, // 30日間セッションを維持（秒単位）
  },
  callbacks: {
    async signIn({ user, profile }) {
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
        } else {
          console.log(`User already exists: ${userId}`);
        }
        return true; // 既存のユーザーでも新規作成してもtrueを返す
      } catch (error) {
        console.error("Error saving user to database:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
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
      if (url === "/auth/signin") {
        return `${baseUrl}/search`;
      }
      return url;
    },
  },
};