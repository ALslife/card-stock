"use client"; // これを追加

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Button from "./_components/button";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false); // ローディング状態の管理

  // ログイン中のステータス表示
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true); // ローディング中は isLoading を true に保つ
      return; // ローディング中は何もしない
    }

    // ローディングが完了したら isLoading を false に設定
    setIsLoading(false); 

    if (session) {
      router.push("/search"); // サインインしていれば /search に遷移
    }
  }, [session, status, router]);


  // ログイン中の場合はフォームは表示しない
  if (session) {
    return null; // sessionがある場合は何も表示しない
  }

  // ログイン中の場合は「ログイン中...」を表示
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>ログイン中...</div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-8">
        <Button
          label={isGoogleSignInLoading ? "Googleでサインイン中..." : "Googleでサインイン"}
          ricon="/google.svg"
          color="bg-gray-200"
          onClick={async () => {
            setIsGoogleSignInLoading(true); // サインイン中の状態をセット
            await signIn("google", { redirect: false });
            setIsGoogleSignInLoading(false); // サインイン終了後、状態をリセット
          }}
        />
      </div>
    </>
  );
};

export default Home;