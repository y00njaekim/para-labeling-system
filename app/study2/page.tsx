import React, { useState, useRef, useEffect } from 'react';
import { RecordingSection } from '@/app/ui/study2/recording-section';
import { Modal } from '@/app/ui/modal';
import { fetchAudios } from '@/app/lib/data';

export default async function RecordingPage() {
  const texts = await fetchAudios();
  return (
    <div className="flex h-screen items-center justify-center">
      <RecordingSection
        title="물음표"
        sentence="나 지금 사무실에서 밥 먹고 있어"
      />
      <Modal></Modal>
    </div>
  );
}
