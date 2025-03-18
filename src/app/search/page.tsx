"use client";
import React, { useState, useEffect } from "react";
import InputForm from "../_components/input";
import Select from "../_components/select";
import Card from "../_components/card";
import Button from "../_components/button";

interface CardType {
  id: string;
  name: string;
  type: string;
  imgUrl: string;
  No: string;
}

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("OP-11");
  const [showResults, setShowResults] = useState(true);
  const [cards, setCards] = useState<CardType[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/cards");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: CardType[] = await res.json();
        setCards(data);
        const initialFilteredCards = data.filter(card => card.type === "OP-11");
        setFilteredCards(initialFilteredCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const result = cards
      .filter(
        (card) =>
          card.name.includes(searchText) &&
          (selectedOption === "" || card.type === selectedOption)
      )
      .sort((a, b) => parseInt(a.No) - parseInt(b.No));

    setFilteredCards(result);
  }, [searchText, selectedOption, cards]);

  return (
    <>
      <div className="pb-4">
        <InputForm
          placeholder="カード名"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="pb-4">
        <Select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            console.log("選択されたオプション:", e.target.value);
          }}
        />
      </div>
      <Button
        label="検索"
        color="bg-red-500 text-white"
        onClick={() => {
          console.log("検索ボタンがクリックされました");
          console.log("現在の検索テキスト:", searchText);
          console.log("選択されたオプション:", selectedOption);
          console.log("全カード:", cards);

          const result = cards.filter(
            (card) =>
              card.name.includes(searchText) &&
              (selectedOption === "" || card.type === selectedOption)
          );
          setFilteredCards(result);
          setShowResults(true);
        }}
      />
      {showResults && (
        <>
          <div className="py-8 text-2xl">HIT数: {filteredCards.length}件</div>
          <div className="grid grid-cols-3 gap-4">
            {filteredCards.map((card) => (
              <Card key={card.id} ImgUrl={card.imgUrl} cardId={card.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Search;