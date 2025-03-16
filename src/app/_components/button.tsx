import React from 'react'
import Image from 'next/image';

interface ButtonProps {
  label: string;
  color: string;
  ricon?: string;
  licon?: string;
  onClick?: () => void; // onClickをオプショナルにする
}

const Button: React.FC<ButtonProps> = ({ label, ricon, licon, color, onClick }) => {
    return (
      <button className={`relative w-full py-5 px-4 rounded-lg font-bold transition-colors hover:bg-opacity-80 active:bg-opacity-80 ${color}`} onClick={onClick}>
        {ricon && <Image width={24} height={24} src={ricon} alt="アイコン" className="absolute w-6 left-4 top-1/2 transform -translate-y-1/2" />} {/* アイコンを表示 */}
        {label} {/* プロパティからラベルを表示 */}
        {licon && <Image width={24} height={24}  src={licon} alt="アイコン" className="absolute w-6 right-4 top-1/2 transform -translate-y-1/2" />} {/* アイコンを表示 */}
      </button>
    );
  };
export default Button;