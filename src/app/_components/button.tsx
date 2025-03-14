import React from 'react'

interface ButtonProps {
  label: string;
  color: string;
  ricon?: string;
  licon?: string;
}

const Button: React.FC<ButtonProps> = ({ label, ricon, licon, color }) => {
    return (
      <button className={`relative w-full py-5 px-4 rounded-lg font-bold transition-colors hover:bg-opacity-80 active:bg-opacity-80 ${color}`}>
        {ricon && <img src={ricon} alt="アイコン" className="absolute w-6 left-4 top-1/2 transform -translate-y-1/2" />} {/* アイコンを表示 */}
        {label} {/* プロパティからラベルを表示 */}
        {licon && <img src={licon} alt="アイコン" className="absolute w-6 right-4 top-1/2 transform -translate-y-1/2" />} {/* アイコンを表示 */}
      </button>
    );
  };
export default Button;