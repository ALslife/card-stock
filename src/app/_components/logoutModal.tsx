import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import useRouter

const LogoutModal = ({ isOpen, onClose }) => {
  const router = useRouter(); // Initialize router

const handleLogout = async () => {
  try {
    await signOut({ redirect: false });
    onClose();
    router.push("/");
  } catch (error) {
    console.error("ログアウトに失敗しました:", error);
  }
};

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-content flex justify-center">
        <div className="py-6">
        <p className="pb-6 text-center">ログアウトしますか？</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          ログアウト
        </button>
        <button
          onClick={onClose}
          className="ml-2 px-4 py-2 rounded bg-blue-500 text-white"
        >
          キャンセル
        </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;