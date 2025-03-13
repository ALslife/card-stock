"use client"; // これを追加

import InputForm from "./_components/input";
import Button from "./_components/button";
import { useState } from "react";

const Home: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const inputFields = [
    { label: "ユーザー名", type: "text" },
    { label: "メールアドレス", type: "email" },
    { label: "パスワード", type: "password" },
  ];

  return (
    <>
      {inputFields.map((field, index) => (
        <div
          key={index}
          className={
            field.type === "password"
              ? `relative ${index < inputFields.length - 1 ? "mb-8" : ""}`
              : index < inputFields.length - 1
              ? "mb-8"
              : ""
          }
        >
          <InputForm
            label={field.label}
            type={
              field.type === "password" && showPassword ? "text" : field.type
            }
          />
          {field.type === "password" && (
            <button
              onClick={togglePasswordVisibility}
              className="absolute right-5 top-5"
            >
              {showPassword ? (
                <img src="/eye_close_fill.svg" />
              ) : (
                <img src="/eye_fill.svg" />
              )}
            </button>
          )}
        </div>
      ))}
      <div className="pt-8">
        <Button label="アカウント作成" color="bg-black text-white" />
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] justify-center items-center gap-4 pt-8">
        <div className="w-full border-t border-solid border-[#BDBDBD] mx-auto"></div>
        <div className="mx-auto">または</div>
        <div className="w-full border-t border-solid border-[#BDBDBD] mx-auto"></div>
      </div>
      <div className="pt-8">
        <Button label="Googleでサインアップ" ricon="/google.svg" color="bg-gray-200" />
      </div>
      <div className="pt-12 text-center">
        <div>アカウントをお持ちですか？</div>
        <a href="/" className="text-black underline">ログインはこちら</a>
      </div>
    </>
  );
};

export default Home;
