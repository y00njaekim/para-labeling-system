import { database } from '@/app/firebase.config';
import { Recording, Transcription, Text, Audio } from '@/app/lib/definition';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
} from 'firebase/firestore';


export const addTranscription = (data: Transcription) => {
  try {
    addDoc(collection(database, 'transcriptions'), data);
  } catch (e) {
    console.error(e);
  }
};

export const addRecording = (data: Recording) => {
  try {
    addDoc(collection(database, 'recordings'), data);
  } catch (e) {
    console.error(e);
  }
};

export const fetchText = async (id: string): Promise<Text | null> => {
  const docRef = doc(database, 'text', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as Text;
  } else {
    console.log('No such document!');
  }
  return null;
};

export const fetchTexts = async (): Promise<Text[]> => {
  const texts: Text[] = [];
  const querySnapshot = await getDocs(
    query(collection(database, 'text'), where("count", '==', 0), limit(30))
  );
  querySnapshot.forEach(doc => {
    texts.push(doc.data() as Text);
  });
  return texts;
};

export const fetchAudio = async (id: string): Promise<Audio | null> => {
  const docRef = doc(database, 'audio', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as Audio;
  } else {
    console.log('No such document!');
  }
  return null;
};

export const fetchAudios = async (): Promise<Audio[]> => {
  const audios: Audio[] = [];
  const querySnapshot = await getDocs(
    query(collection(database, 'audio'), where("count", '==', 0), limit(10))
  );
  querySnapshot.forEach(doc => {
    audios.push(doc.data() as Audio);
  });
  return audios;
};
