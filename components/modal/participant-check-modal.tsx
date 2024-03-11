'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/modal/modal';

export const ParticipantCheckModal = () => {
  const searchParams = useSearchParams();
  const participantNum = searchParams.get('participant') || '';
  const [isModalParticipantOpen, setIsModalParticipantOpen] = useState(false);
  const closeModalParticipant = () => setIsModalParticipantOpen(false);

  useEffect(() => {
    const regex = new RegExp('P\\d{1,}');
    if (!regex.test(participantNum)) {
      setIsModalParticipantOpen(true);
    } else {
      setIsModalParticipantOpen(false);
    }
  }, [participantNum]);

  return (
    <Modal isOpen={isModalParticipantOpen} onClose={closeModalParticipant}>
      <p className="text-center">실험 참여자 ID 가 잘못 입력되었습니다</p>
      <p className="text-center">뒤로가기를 눌러 다시 입력해주세요</p>
    </Modal>
  );
};
