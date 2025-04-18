"use client"; // クライアントコンポーネント

import { useSession } from "next-auth/react";
import { useState } from "react";
import LogoutModal from "./logoutModal";
import Image from 'next/image';

const Header = () => {
  const { data: session } = useSession();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <>
      <header
        className={`pt-10 pb-10 flex ${session ? "justify-between" : "justify-center"} items-center px-5`}
      >
        <h1 className="text-3xl font-bold">Onepick</h1>
        {session ? (
          <div>
            <div className="flex items-center">
              {session.user?.image && (
                <Image
                  width={32}
                  height={32}
                  src={session.user.image}
                  alt="ユーザーアバター"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => session && setIsLogoutModalOpen(true)}
                />
              )}
            </div>
          </div>
        ) : null}
      </header>
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </>
  );
};

export default Header;
