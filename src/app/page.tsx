"use client"; // これを追加

import InputForm from "./_components/input";
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
    <main className="pr-10 pl-10 mr-auto ml-auto w-full max-w-[750px]">
      {inputFields.map((field, index) => (
        <div
          key={index}
          className={
            field.type === "password"
              ? `relative ${index < inputFields.length - 1 ? "mb-8" : ""}`
              : index < inputFields.length - 1
              ? "mb-8"
              : ""
          }>
          <InputForm
            label={field.label}
            type={
              field.type === "password" && showPassword ? "text" : field.type
            }
          />
          {field.type === "password" && (
            <button onClick={togglePasswordVisibility} className="absolute right-5 top-5">
              {showPassword ? <img src="/eye_close_fill.svg" /> : <img src="/eye_fill.svg" />}
            </button>
          )}
        </div>
      ))}
    </main>
  );
};

export default Home;
