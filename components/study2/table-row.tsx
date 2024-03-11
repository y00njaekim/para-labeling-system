'use client';

import { Button } from '@/components/button';
import { useEffect, useState } from 'react';
import { AudioPlayerAndRecorder } from '@/components/study2/player-recorder';
import { MyTableRow } from '../table-row';
import { uploadAndAddRecording } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useStudy2Store } from '@/lib/zustand';


interface Study2TableRowProps {
  key: number;
  participant: string;
  emotion: string;
  recordingURL: string;
  tone: string;
  description: string;
  isUserSubmitted: boolean;
}

export const Study2TableRow: React.FC<Study2TableRowProps> = ({
  key,
  participant,
  emotion,
  recordingURL,
  tone,
  description,
  isUserSubmitted,
}) => {
  const increaseCount = useStudy2Store((state) => state.increase);
  const decreaseCount = useStudy2Store((state) => state.decrease);
  const [isSubmitted, setIsSubmitted] = useState(isUserSubmitted);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (audioFile) {
      uploadAndAddRecording(emotion, tone, participant, audioFile);
      increaseCount();
      setIsSubmitted(true);
    } else if (recordingURL) {
      increaseCount();
      setIsSubmitted(true);
    }
  };

  const handleEdit = () => {
    decreaseCount();
    setIsSubmitted(false);
  };

  return (
    <MyTableRow
      key={key}
      tone={tone}
      description={description}
      isSubmitted={isSubmitted}
    >
      <AudioPlayerAndRecorder
        emotion={emotion}
        tone={tone}
        participant={participant}
        recordingURL={recordingURL}
        setAudioFile={setAudioFile}
        isSubmitted={isSubmitted}
      />
      {isSubmitted ? (
        <>
          <div className='flex items-center min-w-16'>
            <Button onClick={handleEdit}>수정</Button>
          </div>
        </>
      ) : (
        <>
          <div className='flex items-center min-w-16'>
            <Button
              className={cn({
                'bg-gray-300 pointer-events-none': !audioFile && !recordingURL,
              })}
              onClick={handleSubmit}
            >
              완료
            </Button>
          </div>
        </>
      )}
    </MyTableRow>
  );
};
