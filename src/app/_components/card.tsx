import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "./modal";

interface CardProps {
  ImgUrl: string;
  cardId: string;
  heartQuantity?: number;
  bagQuantity?: number;
  onCardUpdate?: (cardId: string, bagQuantity: number, heartQuantity: number) => void;
}

const Card: React.FC<CardProps> = ({ 
  ImgUrl, 
  cardId, 
  heartQuantity: initialHeartQuantity = 0, 
  bagQuantity: initialBagQuantity = 0,
  onCardUpdate
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localHeartQuantity, setLocalHeartQuantity] = useState(initialHeartQuantity);
  const [localBagQuantity, setLocalBagQuantity] = useState(initialBagQuantity);

  // Update local state when props change
  useEffect(() => {
    setLocalHeartQuantity(initialHeartQuantity);
    setLocalBagQuantity(initialBagQuantity);
  }, [initialHeartQuantity, initialBagQuantity]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleQuantityUpdate = (newBagQuantity: number, newHeartQuantity: number) => {
    setLocalBagQuantity(newBagQuantity);
    setLocalHeartQuantity(newHeartQuantity);
    
    // 親コンポーネントにも通知（更新された値を含める）
    if (onCardUpdate) {
      onCardUpdate(cardId, newBagQuantity, newHeartQuantity);
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="cursor-pointer" onClick={openModal}>
        <Image
          src={ImgUrl}
          width={1000}
          height={1000}
          alt=""
          className="w-full h-auto object-cover rounded-lg"
        />
        {(localHeartQuantity > 0 || localBagQuantity > 0) && (
          <div className="absolute top-0 right-0 flex gap-1 p-1">
            {localHeartQuantity > 0 && (
              <div className="flex items-center bg-red-500 rounded-full px-2 py-1">
                <Image src="/heart.svg" alt="Heart" width={12} height={12} />
                <span className="text-xs text-white ml-1">{localHeartQuantity}</span>
              </div>
            )}
            {localBagQuantity > 0 && (
              <div className="flex items-center bg-green-500 rounded-full px-2 py-1">
                <Image src="/bag.svg" alt="Bag" width={12} height={12} />
                <span className="text-xs text-white ml-1">{localBagQuantity}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        ImgUrl={ImgUrl}
        cardId={cardId}
        onQuantityUpdate={handleQuantityUpdate}
        initialBagQuantity={localBagQuantity}
        initialHeartQuantity={localHeartQuantity}
      />
    </div>
  );
};

export default Card;