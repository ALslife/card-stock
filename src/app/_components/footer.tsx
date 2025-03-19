import React from "react";
import Image from "next/image";

interface FooterProps {
  onShowFavorites?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShowFavorites }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-16">
          <button
            className="flex flex-col items-center justify-center"
            onClick={onShowFavorites}
          >
            <Image src="/heart.svg" alt="欲しいもの" width={24} height={24} />
            <span className="text-xs mt-1">欲しいもの</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;