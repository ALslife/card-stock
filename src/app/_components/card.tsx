import React, { useState, useEffect } from 'react'
import Modal from './modal'; 

interface CardProps {
    ImgUrl: string; 
}

const Card: React.FC<CardProps> = ({ ImgUrl }) => {
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
        <img src={ImgUrl} alt="" className='border-radius rounded-lg cursor-pointer' loading="lazy" onClick={handleCardClick} />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} ImgUrl={ImgUrl} />
    </>
  )
}

export default Card;