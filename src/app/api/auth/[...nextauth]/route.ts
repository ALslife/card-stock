import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
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
    async signIn({ user, account, profile }) {
      try {
        // ユーザーがすでにDBに存在するか確認
        const existingUser = await prisma.user.findUnique({
          where: { id: user.id || profile.sub },
        });

        // 存在しない場合は新規作成
        if (!existingUser) {
          await prisma.user.create({
            data: {
              id: user.id || profile.sub,
              email: user.email,
              name: user.name,
              image: user.image,
            },
          });
          console.log(`Created new user: ${user.id || profile.sub}`);
        }
        return true;
      } catch (error) {
        console.error("Error saving user to database:", error);
        // エラーがあっても認証自体は成功させる
        return true;
      }
    },
    async jwt({ token, account, profile }) {
      // 初回ログイン時にトークンにカスタム情報を追加
      if (account) {
        token.id = token.sub; // subをidとして使用
      }
      return token;
    },
    async session({ session, token }) {
      // セッションにユーザーIDを追加
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === "/auth/signin") {
        return `${baseUrl}/search`;
      }
      return url;
    }
  }
};

// NextAuthのハンドラーを作成
const handler = NextAuth(authOptions);

// GETおよびPOSTリクエスト用にハンドラーをエクスポート
export { handler as GET, handler as POST };