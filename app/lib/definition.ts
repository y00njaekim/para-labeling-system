import { Timestamp } from 'firebase/firestore';

export type Audio = {
  count: number;
  fileUrl: string;
  fileName: string;
  naive: string;
}

export type Recording = {
  fileUrl: string;
  participant: string;
  text: string;
  nuance: string[];
  createdAt: Timestamp;
}

export type Text = {
  text: string;
  naive: string;
  count: number;
}

export type Transcription = {
  text: string;
  fileUrl: string;
  participant: string;
  nuance: string[];
  createdAt: Timestamp;
}