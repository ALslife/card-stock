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
  const parsedCardId = parseInt(cardId, 10) || 0;
  const [bagQuantity, setBagQuantity] = useState<number>(0);
  const [heartQuantity, setHeartQuantity] = useState<number>(0);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !userId || !parsedCardId) return;

    setIsLoading(true);
    const loadData = async () => {
      try {
        const response = await fetch(
          `/api/cards/${parsedCardId}?userId=${userId}`
        );
        if (!response.ok) throw new Error(`APIエラー: ${response.status}`);

        const data = await response.json();
        setBagQuantity(data.bagQuantity || 0);
        setHeartQuantity(data.heartQuantity || 0);
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [isOpen, userId, parsedCardId]);

  const saveData = async () => {
    if (!userId || !parsedCardId) {
      setSaveMessage("ユーザーIDまたはカードIDが不明です");
      return;
    }

    try {
      setIsSaving(true);
      setSaveMessage("");

      const response = await fetch("/api/cards/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: parsedCardId,
          userId,
          bagQuantity,
          heartQuantity,
        }),
      });

      if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
      setSaveMessage("更新しました！");

      setTimeout(() => {
        onClose();
        setSaveMessage("");
      }, 500);
    } catch (error) {
      console.error("データ更新エラー:", error);
      setSaveMessage("更新に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center">
          <Image
            src={ImgUrl}
            width={1000}
            height={1000}
            alt=""
            className="rounded-lg"
          />
        </div>
        {isLoading ? (
          <div className="text-center py-4">データを読み込み中...</div>
        ) : (
          <div className="flex flex-col items-center py-4 gap-4">
            {[
              {
                icon: "/bag.svg",
                value: bagQuantity,
                setValue: setBagQuantity,
              },
              {
                icon: "/heart.svg",
                value: heartQuantity,
                setValue: setHeartQuantity,
              },
            ].map(({ icon, value, setValue }, index) => (
              <div key={index} className="flex items-center gap-4">
                <Image width={48} height={48} src={icon} alt="" />
                <button
                  onClick={() => setValue(Math.max(0, value - 1))}
                  className="flex align-center justify-center bg-black w-12 h-12 rounded-lg"
                >
                  <Image width={24} height={24} src="/minus.svg" alt="" />
                </button>
                <input
                  type="number"
                  value={value}
                  className="w-20 h-12 text-center border rounded-lg"
                  readOnly
                />
                <button
                  onClick={() => setValue(value + 1)}
                  className="flex align-center justify-center bg-black w-12 h-12 rounded-lg"
                >
                  <Image width={24} height={24} src="/plus.svg" alt="" />
                </button>
              </div>
            ))}
          </div>
        )}
        {saveMessage && (
          <div
            className={`text-center my-2 ${
              saveMessage.includes("失敗") ? "text-red-500" : "text-green-500"
            }`}
          >
            {saveMessage}
          </div>
        )}
        <Button
          label={isSaving ? "保存中..." : "変更"}
          color={isSaving ? "bg-gray-400 text-white" : "bg-red-500 text-white"} // 文字色を白色に設定
          onClick={saveData}
          disabled={isSaving || isLoading}
        />{" "}
      </div>
    </div>
  );
};

export default Modal;
