'use client';

import React, { useEffect, useState } from 'react';
import { AudioPlayer } from '@/app/ui/audio-player';
import { Button } from '@/app/ui/button';
import { TagsInput } from '@/app/ui/tags-input';
import { Tooltip } from '@/app/ui/study1/tooltip';
import { Audio, Transcription } from '@/app/lib/definition';
import { CotentCheckModal } from '@/app/ui/study1/content-check-modal';
import { useSearchParams } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';
import { addTranscription } from '@/app/lib/data';
import Link from 'next/link';

interface StudyOneProps {
  audios: Audio[];
}

export const StudyOne: React.FC<StudyOneProps> = ({ audios }) => {
  const searchParams = useSearchParams();
  const participantNum = searchParams.get('participant') || '';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [transcription, setTranscription] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [isModalContentOpen, setIsModalContentOpen] = useState(false);

  useEffect(() => {
    if (currentIndex === audios.length - 1) {
      setButtonText('완료');
    } else {
      setButtonText('다음');
    }
    setTranscription(audios[currentIndex].naive);
  }, [currentIndex, audios]);

  const onClickButton = () => {
    if (transcription === '' || participantNum === '' || tags.length === 0) {
      setIsModalContentOpen(true);
      return;
    }
    const data: Transcription = {
      text: transcription,
      fileUrl: audios[currentIndex].fileUrl,
      participant: participantNum,
      nuance: tags,
      createdAt: Timestamp.now(),
    };
    addTranscription(data);
    setTags([]);
    setTranscription('');
    if (currentIndex === audios.length - 1) {
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const closeModalContent = () => {
    setIsModalContentOpen(false);
  };

  return (
    <div className="w-3/5 mx-auto p-4">
      <AudioPlayer audioSrc={audios[currentIndex].fileUrl} />
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">1. 어떤 뉘앙스가 느껴지시나요?</p>
        </div>
        <TagsInput tags={tags} onTagsChange={setTags} />
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            2. 구두점을 추가하여 작성해주세요.
          </p>
          <Tooltip message="여기에 특정 가이드를 입력하세요." />
        </div>
        <textarea
          className="mt-2 p-2 w-full h-24 border rounded-md"
          placeholder="내용을 입력해 주세요."
          value={transcription}
          onChange={e => setTranscription(e.target.value)}
        />
      </div>
      <div className="flex justify-end mt-4">
        {currentIndex === audios.length - 1 ? (
          <Link href='/'>
            <Button onClick={onClickButton}>완료</Button>
          </Link>
        ) : (
          <Button onClick={onClickButton}>다음</Button>
        )}
      </div>
      <CotentCheckModal
        isOpen={isModalContentOpen}
        onClose={closeModalContent}
      ></CotentCheckModal>
    </div>
  );
};
