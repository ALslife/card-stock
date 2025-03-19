// app/layout.tsx
import "./globals.css";
import Header from "./_components/header";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Header />
          <main className="pr-5 pl-5 pb-10 mr-auto ml-auto w-full max-w-[750px]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}