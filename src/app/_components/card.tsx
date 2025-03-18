import React, { useState, useEffect } from 'react';
import Modal from './modal';
import Image from 'next/image';

interface CardProps {
  ImgUrl: string; 
  cardId: string; // cardIdを追加
}

const Card: React.FC<CardProps> = ({ ImgUrl, cardId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // スクロールをロック
    } else {
      document.body.style.overflow = 'unset'; // スクロールを元に戻す
    }

    return () => {
      document.body.style.overflow = 'unset'; // クリーンアップ
    };
  }, [isModalOpen]);
  return (
    <>
      <div style={{width: '100%' }}>
        <Image 
          width={1000} // 幅の比率を保つために1を指定
          height={1000} // 高さの比率を保つために1を指定
          src={ImgUrl} 
          alt="" 
          className='border-radius rounded-lg cursor-pointer' 
          onClick={handleCardClick}
          priority
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} ImgUrl={ImgUrl} cardId={cardId} />
    </>
  );
};

export default Card;