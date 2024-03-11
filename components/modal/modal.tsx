import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg max-w-md mx-auto">
        {children}
        <div className="text-center mt-4">
          <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};