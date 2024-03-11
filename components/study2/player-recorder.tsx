'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MicrophoneIcon,
  StopIcon,
  PlayIcon,
  PauseIcon,
} from '@/components/icon';
import { uploadAndAddRecording } from '@/lib/api';
import { cn } from '@/lib/utils';

interface AudioPlayerAndRecorderProps {
  emotion: string;
  tone: string;
  participant: string;
  recordingURL: string;
  setAudioFile: React.Dispatch<React.SetStateAction<File | null>>;
  isSubmitted: boolean;
}

export const AudioPlayerAndRecorder: React.FC<AudioPlayerAndRecorderProps> = ({
  participant,
  tone,
  emotion,
  recordingURL,
  setAudioFile,
  isSubmitted,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>(recordingURL);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const IconComponent = isRecording ? StopIcon : MicrophoneIcon;

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      const audioFile = new File(
        [audioBlob],
        `${participant}_${tone}_recording.mp3`,
        { type: 'audio/mp3' }
      );
      setAudioFile(audioFile);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [audioBlob, emotion, tone, participant, setAudioFile]);

  useEffect(() => {
    if (!audioUrl) {
      setAudioProgress(0);
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const updateProgress = () => {
      if (!audio.duration) return;
      const progress = (audio.currentTime / audio.duration) * 100;
      setAudioProgress(progress);
    };

    const handleAudioEnd = () => {
      setIsPlaying(false);
      setAudioProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleAudioEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [audioUrl]);

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

  const togglePlay = () => {
    if (!audioUrl) return;

    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.pause();
    } else {
      audio?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-10/12">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between space-x-4">
          <button
            className={cn(
              `inline-flex justify-center items-center p-2 rounded-full focus:outline-none focus:ring-2  transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50`,
              {
                'bg-red-500 hover:bg-red-400 focus:ring-red-300 focus-visible:outline-red-500 active:bg-red-600':
                  isRecording,
                'bg-blue-500 hover:bg-blue-400 focus:ring-blue-300 focus-visible:outline-blue-500 active:bg-blue-600':
                  !isRecording,
              },
              {
                'bg-gray-300 pointer-events-none': isSubmitted,
              }
            )}
            onClick={isRecording ? stopRecording : startRecording}
          >
            <IconComponent
              className="text-white"
              fill="currentColor"
              stroke="none"
            />
          </button>
          <div className="flex w-full items-center space-x-4">
            <button
              className={cn(
                'inline-flex justify-center items-center p-2 rounded-full focus:outline-none focus:ring-2 transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                {
                  'bg-blue-500 hover:bg-blue-400 focus:ring-blue-300': audioUrl,
                  'bg-gray-300 pointer-events-none': !audioUrl,
                },
                {
                  'bg-gray-300 pointer-events-none': isSubmitted,
                }
              )}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <PauseIcon className="text-white" width="24" height="24" />
              ) : (
                <PlayIcon className="text-white" width="24" height="24" />
              )}
            </button>
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              {!isSubmitted && (
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${audioProgress}%` }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
