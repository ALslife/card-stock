"use client"; // クライアントコンポーネント

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/header";
import { SessionProvider } from "next-auth/react"; // ✅ 追加

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <SessionProvider> {/* ✅ 追加：これで useSession() が使用可能に */}
          <Header />
          <main className="pr-5 pl-5 pb-10 mr-auto ml-auto w-full max-w-[750px]">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
