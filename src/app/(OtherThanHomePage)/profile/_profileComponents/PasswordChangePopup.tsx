import React from "react";
import Link from "next/link";

interface PasswordPopupProps {
  onClose: () => void;
}

const PasswordPopup: React.FC<PasswordPopupProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-xl text-center max-w-sm">
        <h3 className="text-lg font-semibold mb-2">Password Change Required</h3>
        <p className="text-sm mb-4">
          Your account requires a password update. Please set a new password to
          continue.
        </p>
        <Link
          href="/change-password"
          className="px-4 py-2 bg-transparent border border-accent hover:bg-accent hover:border-fourth text-black hover:text-white duration-500 rounded-lg font-medium"
        >
          Change Password
        </Link>
        <button
          onClick={onClose}
          className="block mx-auto mt-3 text-sm text-gray-500 hover:underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default PasswordPopup;
