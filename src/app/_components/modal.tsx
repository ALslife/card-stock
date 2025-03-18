import React, { useState, useEffect } from "react";
import Button from "./button";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ImgUrl: string;
  cardId: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, ImgUrl, cardId }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [bagQuantity, setBagQuantity] = useState<number>(0);
  const [heartQuantity, setHeartQuantity] = useState<number>(0);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && userId && cardId) {
      setIsLoading(true);
      const loadData = async () => {
        try {
          // APIリクエストパスをログに出力
          const requestUrl = `/api/cards/${cardId}?userId=${userId}`;
          console.log(`APIリクエスト: ${requestUrl}`);
          
          const response = await fetch(requestUrl);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`APIエラーステータス: ${response.status}`, errorText);
            throw new Error(`APIエラー: ${response.status}`);
          }
          
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("JSONレスポンスではありません");
          }
          
          const data = await response.json();
          console.log("取得データ:", data);
          if (data) {
            setBagQuantity(data.bagQuantity || 0);
            setHeartQuantity(data.heartQuantity || 0);
          }
        } catch (error) {
          console.error("データ取得エラー詳細:", error);
          // エラー時はデフォルト値を使用
          setBagQuantity(0);
          setHeartQuantity(0);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }
  }, [userId, cardId, isOpen]);

  async function saveData(data) {
    try {
      setIsSaving(true);
      setSaveMessage("");
      console.log("送信データ:", data);
      
      const response = await fetch('/api/cards/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`エラーレスポンス: ${response.status}`, errorText);
        setSaveMessage("更新に失敗しました");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("成功レスポンス:", result);
      setSaveMessage("更新しました！");
      return result;
    } catch (error) {
      console.error('カードデータ更新エラー:', error);
      setSaveMessage("更新に失敗しました");
      throw error;
    } finally {
      setIsSaving(false);
    }
  }

  const increaseBagQuantity = () => setBagQuantity((prev) => prev + 1);
  const decreaseBagQuantity = () =>
    setBagQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  const increaseHeartQuantity = () => setHeartQuantity((prev) => prev + 1);
  const decreaseHeartQuantity = () =>
    setHeartQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const modalClass = isOpen ? "modal-overlay open" : "modal-overlay";

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!userId || !cardId) {
      setSaveMessage("ユーザーIDまたはカードIDが不明です");
      return;
    }
    
    // 必要なデータだけを含むオブジェクトを作成
    const data = {
      cardId: cardId,
      userId: userId,
      bagQuantity: bagQuantity,
      heartQuantity: heartQuantity
    };
    
    try {
      await saveData(data);
      // 成功時の処理（すでにsetSaveMessageで処理されています）
    } catch (error) {
      // エラー処理（すでにsetSaveMessageで処理されています）
    }
  };

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
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <p>データを読み込み中...</p>
          </div>
        ) : (
          <>
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
          </>
        )}
        
        {saveMessage && (
          <div className={`text-center my-2 ${saveMessage.includes('失敗') ? 'text-red-500' : 'text-green-500'}`}>
            {saveMessage}
          </div>
        )}
        <Button
          label={isSaving ? "保存中..." : "変更"}
          color={isSaving ? "bg-gray-400 text-white" : "bg-red-500 text-white"}
          onClick={handleSave}
          disabled={isSaving || isLoading}
        />
      </div>
    </div>
  );
};

export default Modal;