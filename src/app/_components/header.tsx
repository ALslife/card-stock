"use client"; // クライアントコンポーネント

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // useRouter をインポート

const Header = () => {
  const { data: session } = useSession();  // セッション情報を取得
  const router = useRouter(); // useRouter を使用してルーターを取得

  const handleLogout = async () => {
    await signOut({ redirect: false }); // リダイレクトを無効にする
    router.push("/"); // ログアウト後にルートにリダイレクト
  };

  return (
    <header className="pt-10 pb-10 flex justify-between items-center px-5">
      <h1 className="text-3xl font-bold">Onepick</h1>
      {session ? (
        <div className="flex items-center gap-4">
          <p className="text-gray-700">ログイン中: {session.user?.name}</p>
          <button
            onClick={handleLogout} // handleLogout を呼び出す
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            ログアウト
          </button>
        </div>
      ) : (
        <p className="text-gray-500">ログインしていません</p>
      )}
    </header>
  );
};

export default Header;