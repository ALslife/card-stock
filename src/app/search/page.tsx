"use client";
import React, { useState, useEffect, useCallback } from "react";
import InputForm from "../_components/input";
import Select from "../_components/select";
import Card from "../_components/card";
import Button from "../_components/button";
import Footer from "../_components/footer";
import { useSession } from "next-auth/react";

interface CardType {
  id: string;
  name: string;
  type: string;
  imgUrl: string;
  No: string;
  heartQuantity?: number;
}

const Search: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("OP-11");
  const [cards, setCards] = useState<CardType[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [userCardData, setUserCardData] = useState<Record<string, { heartQuantity: number, bagQuantity: number }>>({});
  const CARDS_PER_PAGE = 6;
  const [visibleCardCount, setVisibleCardCount] = useState(CARDS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'favorites'>('all');
  const [dataLoaded, setDataLoaded] = useState(false);
  
  // 最後にマウントされたカードの参照
  const lastCardElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || !node) return;
    
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && visibleCardCount < filteredCards.length) {
        setVisibleCardCount(prevCount => prevCount + CARDS_PER_PAGE);
      }
    });
    
    observer.observe(node);
    return () => observer.disconnect();
  }, [loading, filteredCards.length, visibleCardCount]);

  // 初回のデータ取得（マウント時に1回だけ実行）
  useEffect(() => {
    const fetchData = async () => {
      if (!userId || dataLoaded) return;
      
      try {
        setLoading(true);
        
        // カードデータを取得
        const cardsRes = await fetch("/api/cards");
        if (!cardsRes.ok) throw new Error("Cards fetch failed");
        const cardsData: CardType[] = await cardsRes.json();
        setCards(cardsData);
        
        // ユーザーカードデータを取得
        const userCardRes = await fetch(`/api/user-cards?userId=${userId}`);
        if (!userCardRes.ok) throw new Error("User cards fetch failed");
        const userCardItems = await userCardRes.json();
        
        const userCardMap: Record<string, { heartQuantity: number, bagQuantity: number }> = {};
        userCardItems.forEach((item: { cardId: number, heartQuantity: number, bagQuantity: number }) => {
          userCardMap[item.cardId.toString()] = {
            heartQuantity: item.heartQuantity || 0,
            bagQuantity: item.bagQuantity || 0
          };
        });
        
        setUserCardData(userCardMap);
        setDataLoaded(true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [userId, dataLoaded]);

  // フィルタリング関数（メモ化してパフォーマンス向上）
  const getFilteredCards = useCallback(() => {
    if (!cards.length) return [];
    
    return cards.filter(card => {
      // テキストフィルタリング
      const textMatch = searchText === "" || 
                       card.name.toLowerCase().includes(searchText.toLowerCase());
      
      // タイプフィルタリング
      const typeMatch = selectedOption === "" || card.type === selectedOption;
      
      // お気に入りフィルタリング
      if (filterMode === 'favorites') {
        const cardInfo = userCardData[card.id];
        const isFavorite = cardInfo && cardInfo.heartQuantity > 0;
        return textMatch && typeMatch && isFavorite;
      }
      
      return textMatch && typeMatch;
    }).sort((a, b) => parseInt(a.No) - parseInt(b.No));
  }, [cards, searchText, selectedOption, filterMode, userCardData]);

  // フィルタリングの適用（検索条件が変わったときのみ実行）
  useEffect(() => {
    if (dataLoaded) {
      const filtered = getFilteredCards();
      setFilteredCards(filtered);
      setVisibleCardCount(CARDS_PER_PAGE);
    }
  }, [dataLoaded, getFilteredCards]);

  // カード更新時のハンドラ（お気に入り状態や数量の変更）
  const handleCardUpdate = useCallback((cardId: string, newBagQuantity: number, newHeartQuantity: number) => {
    // バックエンドAPIを呼び出してデータを更新（ここでは省略）
    
    // ローカルの状態を更新
    setUserCardData(prev => ({
      ...prev,
      [cardId]: { heartQuantity: newHeartQuantity, bagQuantity: newBagQuantity }
    }));
    
    // お気に入りモードでheartQuantityが0の場合はリストから削除
    if (filterMode === 'favorites' && newHeartQuantity === 0) {
      setFilteredCards(prev => prev.filter(card => card.id !== cardId));
    }
  }, [filterMode]);

  // 検索ボタンクリック時のハンドラ
  const handleSearch = useCallback(() => {
    setFilterMode('all');
  }, []);

  // 選択肢変更時のハンドラ
  const handleOptionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  }, []);

  // 欲しいものボタンクリック時のハンドラ
  const handleShowFavorites = useCallback(() => {
    setFilterMode('favorites');
  }, []);

  // 表示するカード
  const visibleCards = filteredCards.slice(0, visibleCardCount);

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
          onChange={handleOptionChange}
        />
      </div>
      <Button
        label="検索"
        color="bg-red-500 text-white"
        onClick={handleSearch}
      />
      <div style={{ marginBottom: '4rem' }}>
        <div className="py-8 text-2xl">
          HIT数: {filteredCards.length}件
          {filterMode === 'favorites' && <span className="text-sm ml-2">(欲しいもの)</span>}
        </div>
        <div className="grid grid-cols-3 gap-4 pb-20">
          {visibleCards.map((card, index) => (
            <div 
              key={card.id} 
              ref={index === visibleCards.length - 1 ? lastCardElementRef : undefined}
            >
              <Card 
                ImgUrl={card.imgUrl} 
                cardId={card.id}
                heartQuantity={userCardData[card.id]?.heartQuantity || 0}
                bagQuantity={userCardData[card.id]?.bagQuantity || 0}
                onCardUpdate={handleCardUpdate}
              />
            </div>
          ))}
        </div>
        {loading && (
          <div className="flex justify-center my-4">
            <p>読み込み中...</p>
          </div>
        )}
        {filteredCards.length === 0 && !loading && (
          <div className="flex justify-center my-4">
            <p>該当するカードがありません。</p>
          </div>
        )}
      </div>
      <Footer 
        onShowFavorites={handleShowFavorites}
      />
    </>
  );
};

export default Search;