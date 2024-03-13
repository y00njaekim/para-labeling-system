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
  const increaseCount = useStudy2Store(state => state.increase);
  const decreaseCount = useStudy2Store(state => state.decrease);
  const [isSubmitted, setIsSubmitted] = useState(isUserSubmitted);
  const [isLoading, setIsLoading] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (audioFile) {
      // setIsSubmitted(true);
      setIsLoading(true);
      uploadAndAddRecording(emotion, tone, participant, audioFile)
        .then(isSuccessful => {
          if (isSuccessful) {
            setIsSubmitted(true);
            increaseCount();
            setIsLoading(false);
          } else {
            console.error('Error in uploading and adding recording');
            setIsSubmitted(false);
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
          setIsSubmitted(false);
          setIsLoading(false);
        });
    } else if (recordingURL) {
      setIsSubmitted(true);
      increaseCount();
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
          <div className="flex items-center min-w-16">
            <Button onClick={handleEdit}>수정</Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center min-w-16">
            <Button
              className={cn({
                'bg-gray-300 pointer-events-none': !audioFile && !recordingURL,
                'pointer-events-none': isLoading,
              })}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white-900"></div>
                </>
              ) : (
                <>완료</>
              )}
            </Button>
          </div>
        </>
      )}
    </MyTableRow>
  );
};
