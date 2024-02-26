'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MicrophoneIcon, StopIcon } from '@/app/ui/icon';
import { AudioPlayer } from '@/app/ui/audio-player';
import { TagsInput } from '@/app/ui/tags-input';

interface RecordingSectionProps {
  title: string;
  sentence: string;
}

export const RecordingSection: React.FC<RecordingSectionProps> = ({
  title,
  sentence,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      return () => {
        URL.revokeObjectURL(url); // 컴포넌트 언마운트 시 URL 해제
      };
    }
  }, [audioBlob]);

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Media devices not supported');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = event => {
        setAudioBlob(event.data);
      };
      mediaRecorderRef.current.onstart = () => {
        setIsRecording(true);
      };
      mediaRecorderRef.current.onstop = () => {
        setIsRecording(false);
      };
      mediaRecorderRef.current.onerror = event => {
        console.error('MediaRecorder error:', event);
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error('An error occurred while starting the recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const buttonStyle = isRecording
    ? 'bg-red-500 hover:bg-red-700'
    : 'bg-blue-500 hover:bg-blue-700';
  const IconComponent = isRecording ? StopIcon : MicrophoneIcon;

  return (
    <div className="w-3/5 mx-auto p-4">
      <div className="flex flex-col space-y-4">
        <div className="text-lg font-semibold">{title}</div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">1. 다음 문장을 녹음해주세요:</p>
          <p className="text-sm font-medium highlight">{sentence}</p>
          {audioUrl && (
            <p className="text-sm font-medium text-red-500">(녹음 완료)</p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <button
            className={`inline-flex justify-center items-center p-2 rounded-full ${buttonStyle} focus:outline-none focus:ring-2 focus:ring-blue-300`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            <IconComponent
              className="text-white"
              fill="currentColor"
              stroke="none"
            />
          </button>
          <AudioPlayer audioSrc={audioUrl} />
        </div>
      </div>
      <div className="flex items-center justify-between  mt-5">
        <p className="text-sm font-medium">2. 어떤 뉘앙스가 느껴지시나요?</p>
      </div>
      <TagsInput initialTags={[]} />
    </div>
  );
};
