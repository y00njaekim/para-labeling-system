import { fileUpload } from '@/lib/storage';
import {
  addRecording,
  fetchTones,
  fetchUser,
  fetchUserSubmittedRecordings,
  fetchUserSubmittedTexts,
  patchPassword,
} from '@/lib/data';
import { Timestamp } from 'firebase/firestore';
import { UserParaText, UserRecording } from '@/lib/definition';
import { hashing } from '@/lib/utils';

export const uploadAndAddRecording = async (
  emotion: string,
  tone: string,
  participant: string,
  file: File
): Promise<boolean> => {
  try {
    const path = 'recordings';
    const downloadURL = await fileUpload(file, path);
    addRecording({
      emotion,
      tone,
      participant,
      recordingURL: downloadURL,
      createdAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error uploading file:', error);
    return false;
  }
};

export const getUserSubmittedTexts = async (participant: string) => {
  const tonesData = fetchTones();
  const textsData = fetchUserSubmittedTexts(participant);
  const [tones, texts] = await Promise.all([tonesData, textsData]);

  const merged: UserParaText[] = [];
  tones.forEach(tone => {
    const match = texts.find(userText => userText.tone === tone.tone);
    if (match) {
      const { createdAt, participant, ...rest } = match;
      merged.push({
        ...rest,
        description: tone.description,
        isSubmitted: true,
      });
    } else {
      merged.push({
        emotion: tone.emotion,
        description: tone.description,
        tone: tone.tone,
        text: '',
        isSubmitted: false,
      });
    }
  });

  return merged;
};

export const getUserSubmittedRecordings = async (participant: string) => {
  const tonesData = fetchTones();
  const recordingsData = fetchUserSubmittedRecordings(participant);
  const [tones, recordings] = await Promise.all([tonesData, recordingsData]);

  const merged: UserRecording[] = [];
  tones.forEach(tone => {
    const match = recordings.find(
      userRecording => userRecording.tone === tone.tone
    );
    if (match) {
      const { createdAt, participant, ...rest } = match;
      merged.push({
        ...rest,
        description: tone.description,
        isSubmitted: true,
      });
    } else {
      merged.push({
        emotion: tone.emotion,
        description: tone.description,
        tone: tone.tone,
        recordingURL: '',
        isSubmitted: false,
      });
    }
  });

  return merged;
};

export const validatePassword = async (participant: string, password: string) => {
  const user = await fetchUser(participant);
  if (!user) return false;
  return user.password === hashing(password);
}

export const EditPassword = async (participant: string, password: string, newPassword: string) => {
  const user = await fetchUser(participant);
  if (!user) return false;
  const isValid = user.password === hashing(password);
  if(!isValid) return false;
  patchPassword(user, newPassword);
  return true;
}