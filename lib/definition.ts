import { Timestamp } from 'firebase/firestore';

export type Tone = {
  emotion: string;
  tone: string;
  description: string;
}

export type Recording = {
  emotion: string;
  tone: string;
  participant: string;
  recordingURL: string;
  createdAt: Timestamp;
}

export type UserRecording = {
  emotion: string;
  tone: string;
  recordingURL: string;
  description: string;
  isSubmitted: boolean;
}

export type ParaText = {
  emotion: string;
  tone: string;
  participant: string;
  text: string;
  createdAt: Timestamp;
}

export type UserParaText = {
  emotion: string;
  tone: string;
  text: string;
  description: string;
  isSubmitted: boolean;
}