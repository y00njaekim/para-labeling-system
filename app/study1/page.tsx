'use client';

import { Button } from '@/app/ui/button';
import { TagsInput } from '@/app/ui/tags-input';
import { AudioPlayer } from '@/app/ui/audio-player';
import { Modal } from '@/app/ui/modal';
import { addTranscription, fetchAudios } from '@/app/lib/data';
import { Audio, Transcription } from '@/app/lib/definition';
import { Tooltip } from '@/app/ui/study1/tooltip';
import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [result, setResult] = useState<Transcription>();
  const [isModalParticipantOpen, setIsModalParticipantOpen] = useState(false);
  const [isModalContentOpen, setIsModalContentOpen] = useState(false);
  const searchParams = useSearchParams();
  const participantNum = searchParams.get('participant');
  
  const closeModalParticipant = () => setIsModalParticipantOpen(false);
  const closeModalContent = () => setIsModalContentOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAudios = await fetchAudios();
      setAudios(fetchedAudios);
      console.log('Fetched audios:', fetchedAudios);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Tags:', tags);
  }, [tags]);

  const handleButtonClick = () => {
    setResult({
      participant: participantNum || 'P0',
      text: text,
      nuance: tags,
      fileUrl: audios[currentIndex].fileUrl,
      createdAt: Timestamp.now(),
    });
    if (result && tags.length > 0) {
      addTranscription(result);
      if (currentIndex < audios.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        console.log('Completed', tags);
      }
      setTags([]);
      setText('');
    } else {
      console.error('Result is empty');
      setIsModalContentOpen(true);
    }
  };

  const buttonText = currentIndex < audios.length - 1 ? '다음' : '완료';

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-3/5 mx-auto p-4">
        {/* <AudioPlayer audioSrc={audios[currentIndex].fileUrl} /> */}
        {audios[currentIndex] ? (
          <AudioPlayer audioSrc={audios[currentIndex].fileUrl} />
        ) : (
          <p>No audio available</p>
        )}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              1. 어떤 뉘앙스가 느껴지시나요?
            </p>
          </div>
          <TagsInput initialTags={[]} onTagsChange={setTags} />
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
            // value={audios[currentIndex].naive}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleButtonClick}>{buttonText}</Button>
        </div>
      </div>
      <Modal isOpen={isModalParticipantOpen} onClose={closeModalParticipant}>
        <p className="text-center">실험 참여자 ID 가 잘못 입력되었습니다</p>
        <p className="text-center">뒤로가기를 눌러 다시 입력해주세요</p>
      </Modal>
      <Modal isOpen={isModalContentOpen} onClose={closeModalContent}>
        <p className="text-center">입력하지 않은 내용이 있습니다</p>
        <p className="text-center">닫기를 눌러 다시 입력해주세요</p>
      </Modal>
    </div>
  );
}
