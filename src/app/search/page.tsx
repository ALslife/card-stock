"use client"; // これを追加

import InputForm from "../_components/input";
import Button from "../_components/button";
import Select from "../_components/select";
import Card from "../_components/card";
import React, { useState, useEffect } from 'react';

const Search: React.FC = () => {
  const [cardCount, setCardCount] = useState(6); // 最初に表示するカードの数
  const totalCards = 100; // 表示するカードの総数（例）

  const loadMoreCards = () => {
    if (cardCount < totalCards) {
      setCardCount(prevCount => prevCount + 3); // 3つのカードを追加
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        loadMoreCards();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cardCount]);

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
        <Button label="検索" color="bg-red-500 text-white" licon="/search.svg" />
      </div>
      <div className="py-8 text-2xl">
        HIT数:<span>100件</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: cardCount }).map((_, index) => (
          <Card key={index} ImgUrl={`https://picsum.photos/200/250?random`} />
        ))}
      </div>
    </>
  );
};

export default Search;