import React, { useState, useEffect } from "react";
import Button from "./button";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ImgUrl: string;
  cardId: string; // 各カードを識別するためのIDを追加
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, ImgUrl, cardId }) => {
  const { data: session } = useSession(); // セッション情報を取得
  const [bagQuantity, setBagQuantity] = useState<number>(0);
  const [heartQuantity, setHeartQuantity] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      console.log("Current cardId:", cardId); // ここでcardIdを確認
      // ローカルストレージから数量を取得
      const savedBagQuantity = localStorage.getItem(
        `user_${session.user.email}_bagQuantity_${cardId}`
      );
      const savedHeartQuantity = localStorage.getItem(
        `user_${session.user.email}_heartQuantity_${cardId}`
      );
      if (savedBagQuantity) setBagQuantity(Number(savedBagQuantity));
      if (savedHeartQuantity) setHeartQuantity(Number(savedHeartQuantity));

      if (session && session.user?.id) {
        // サインインしたユーザーのデータを取得
        const loadData = async () => {
          const response = await fetch(`/api/user/${session.user.id}`);
          const data = await response.json();
          const userCardData = data.cardData.find(
            (card: string) => card.cardId === cardId
          );
          if (userCardData) {
            setBagQuantity(userCardData.bagQuantity);
            setHeartQuantity(userCardData.heartQuantity);
          }
        };
        loadData();
      }
    }
  }, [session, cardId, isOpen]);

  const saveData = async () => {
    if (session && session.user?.id) {
      await fetch(`/api/user/${session.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardData: { cardId, bagQuantity, heartQuantity },
        }),
      });
    }
    console.log(session.user.id);
    // ユーザーIDを含めたキーでローカルストレージに数量を保存
    localStorage.setItem(
      `user_${session.user.email}_bagQuantity_${cardId}`,
      bagQuantity.toString()
    );
    localStorage.setItem(
      `user_${session.user.email}_heartQuantity_${cardId}`,
      heartQuantity.toString()
    );
  };

  const increaseBagQuantity = () => setBagQuantity((prev) => prev + 1);
  const decreaseBagQuantity = () =>
    setBagQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  const increaseHeartQuantity = () => setHeartQuantity((prev) => prev + 1);
  const decreaseHeartQuantity = () =>
    setHeartQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const modalClass = isOpen ? "modal-overlay open" : "modal-overlay"; // isOpenに基づいてクラスを切り替え

  if (!isOpen) return null;

  return (
    <div className={modalClass} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center pt-8">
          <Image
            src={ImgUrl}
            layout="responsive"
            width={1}
            height={1}
            alt=""
            className="modal-image border-radius rounded-lg"
          />
        </div>
        <div className="flex justify-center pt-8 gap-8">
          <Image
            width={24}
            height={24}
            src="/bag.svg"
            alt=""
            className="w-12 h-12"
          />
          <button
            onClick={decreaseBagQuantity}
            className="flex justify-center px-3 bg-black w-12 h-12 rounded-lg"
          >
            <Image width={24} height={24} src="/minus.svg" alt="" />
          </button>
          <input
            type="number"
            value={bagQuantity}
            className="border border-solid border-[#BDBDBD] w-20 h-12 rounded-lg text-center"
            readOnly
          />
          <button
            onClick={increaseBagQuantity}
            className="flex justify-center px-2 bg-black w-12 h-12 rounded-lg"
          >
            <Image width={24} height={24} src="/plus.svg" alt="" />
          </button>
        </div>

        <div className="flex justify-center py-8 gap-8">
          <Image
            width={24}
            height={24}
            src="/heart.svg"
            alt=""
            className="w-12 h-12"
          />
          <button
            onClick={decreaseHeartQuantity}
            className="flex justify-center px-3 bg-black w-12 h-12 rounded-lg"
          >
            <Image width={24} height={24} src="/minus.svg" alt="" />
          </button>
          <input
            type="number"
            value={heartQuantity}
            className="border border-solid border-[#BDBDBD] w-20 h-12 rounded-lg text-center"
            readOnly
          />
          <button
            onClick={increaseHeartQuantity}
            className="flex justify-center px-2 bg-black w-12 h-12 rounded-lg"
          >
            <Image width={24} height={24} src="/plus.svg" alt="" />
          </button>
        </div>
        <Button
          label="変更"
          color="bg-red-500 text-white"
          onClick={() => {
            saveData();
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
