import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
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
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) { // baseUrlを追加
      if (url === "/auth/signin") {
        return `${baseUrl}/search`; // `/search` ページにリダイレクト
      }
      return url; // デフォルトのリダイレクト
    }
  }
};

// NextAuthのハンドラーを作成
const handler = NextAuth(authOptions);

// GETおよびPOSTリクエスト用にハンドラーをエクスポート
export { handler as GET, handler as POST };