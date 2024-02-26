'use client';
import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon } from '@/app/ui/icon';

interface AudioPlayerProps {
  audioSrc: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioSrc) {
      setAudioProgress(0);
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(audioSrc);
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
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioSrc) return;

    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.pause();
    } else {
      audio?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex w-full items-center space-x-4">
      <button
        className="inline-flex justify-center items-center p-2 rounded-full bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <PauseIcon className="text-white" width="24" height="24" />
        ) : (
          <PlayIcon className="text-white" width="24" height="24" />
        )}
      </button>
      <div className="flex-1 h-2 bg-gray-200 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${audioProgress}%` }}
        />
      </div>
    </div>
  );
};
