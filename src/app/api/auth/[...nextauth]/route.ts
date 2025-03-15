import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin", // カスタムログインページ（オプション）
  },
  callbacks: {
    // リダイレクト先を指定
    async redirect({ url, baseUrl }) {
      // Google認証後に `/search` ページにリダイレクト
      if (url === "/auth/signin") {
        return `${baseUrl}/search`; // `/search` ページにリダイレクト
      }
      return url; // その他のリダイレクトの場合はそのまま
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
