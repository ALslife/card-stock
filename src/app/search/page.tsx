"use client"; // これを追加

import InputForm from "../_components/input";
import Button from "../_components/button";
import Select from "../_components/select";

const Search: React.FC = () => {
  const inputFields = [
    { type: "text", placeholder: "カード名" },
  ];

  return (
    <>
      {inputFields.map((field, index) => (
        <div key={index} className="mb-8">
          <InputForm placeholder={field.placeholder} type={field.type} />
        </div>
      ))}
      <Select />
      <div className="pt-8">
        <Button label="詳細検索" color="bg-orange-400 text-white" />
      </div>
      <div className="pt-8">
        <Button label="検索" color="bg-red-500 text-white" />
      </div>
    </>
  );
};

export default Search;