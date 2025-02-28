import React from 'react';

interface InputFormProps {
  label: string; // ラベル用のプロパティを定義
}

const InputForm: React.FC<InputFormProps> = ({ label }) => {
  return (
    <div className="relative w-full">
      <label className="absolute -top-2.5 left-1.5 px-2.5 bg-white text-[#757575]">
        {label} {/* プロパティからラベルを表示 */}
      </label>
      <input type="text" className="border border-solid border-[#BDBDBD] w-full py-5 px-4 rounded-lg" />
    </div>
  );
};

export default InputForm;
