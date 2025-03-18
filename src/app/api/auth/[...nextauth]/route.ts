import NextAuth from "next-auth";
import { authOptions } from "../auth-options"; // 相対パスで正しく調整してください

// NextAuthのハンドラーを作成
const handler = NextAuth(authOptions);

// GETおよびPOSTリクエスト用にハンドラーのみをエクスポート
export { handler as GET, handler as POST };