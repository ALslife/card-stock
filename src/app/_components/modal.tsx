// Modal.tsx
import React, { useState } from 'react';
import Button from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ImgUrl: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, ImgUrl }) => {
    const [bagQuantity, setBagQuantity] = useState(0); // バッグの初期値
    const [heartQuantity, setHeartQuantity] = useState(0); // ハートの初期値
  
    const increaseBagQuantity = () => {
      setBagQuantity(prev => prev + 1);
    };
  
    const decreaseBagQuantity = () => {
      setBagQuantity(prev => (prev > 0 ? prev - 1 : 0));
    };
  
    const increaseHeartQuantity = () => {
      setHeartQuantity(prev => prev + 1);
    };
  
    const decreaseHeartQuantity = () => {
      setHeartQuantity(prev => (prev > 0 ? prev - 1 : 0));
    };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center pt-8">
            <img src={ImgUrl} alt="" className="modal-image border-radius rounded-lg" />
        </div>
        {/* バッグの数量管理 */}
        <div className="flex justify-center pt-8 gap-8">
          <img src="/bag.svg" alt="" className="w-12 h-12" />
          <button className="flex justify-center px-3 bg-black w-12 h-12 rounded-lg" onClick={decreaseBagQuantity}>
            <img src="/minus.svg" alt="" />
          </button>
          <input
            type="number"
            value={bagQuantity}
            className="border border-solid border-[#BDBDBD] w-20 h-12 rounded-lg text-center"
            readOnly
          />
          <button className="flex justify-center px-2 bg-black w-12 h-12 rounded-lg" onClick={increaseBagQuantity}>
            <img src="/plus.svg" alt="" />
          </button>
        </div>

        {/* ハートの数量管理 */}
        <div className="flex justify-center py-8 gap-8">
          <img src="/heart.svg" alt="" className="w-12 h-12" />
          <button className="flex justify-center px-3 bg-black w-12 h-12 rounded-lg" onClick={decreaseHeartQuantity}>
            <img src="/minus.svg" alt="" />
          </button>
          <input
            type="number"
            value={heartQuantity}
            className="border border-solid border-[#BDBDBD] w-20 h-12 rounded-lg text-center"
            readOnly
          />
          <button className="flex justify-center px-2 bg-black w-12 h-12 rounded-lg" onClick={increaseHeartQuantity}>
            <img src="/plus.svg" alt="" />
          </button>
        </div>
        <Button label="変更" color="bg-red-500 text-white" onClick={onClose} />
      </div>
    </div>
  );
};

export default Modal;