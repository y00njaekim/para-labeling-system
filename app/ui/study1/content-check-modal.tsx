'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Modal } from '@/app/ui/fundamental/modal';

interface ContentCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export const CotentCheckModal: React.FC<ContentCheckModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="text-center">입력하지 않은 내용이 있습니다</p>
      <p className="text-center">닫기를 눌러 다시 입력해주세요</p>
    </Modal>
  );
};
