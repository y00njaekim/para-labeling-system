import { database } from '@/app/firebase.config';
import { ParaText, Recording, Tone } from '@/lib/definition';
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

export const fetchTones = async (): Promise<Tone[]> => {
  const tones: Tone[] = [];
  const querySnapshot = await getDocs(collection(database, 'tones'));
  querySnapshot.forEach(doc => {
    tones.push(doc.data() as Tone);
  });
  return tones;
};

export const fetchUserSubmittedTexts = async (participant: string): Promise<ParaText[]> => {
  const texts: ParaText[] = [];
  const querySnapshot = await getDocs(query(collection(database, 'texts'), where('participant', '==', participant)));
  querySnapshot.forEach(doc => {
    texts.push(doc.data() as ParaText);
  });
  return texts;
}

export const fetchUserSubmittedRecordings = async (participant: string): Promise<Recording[]> => {
  const recordings: Recording[] = [];
  const querySnapshot = await getDocs(query(collection(database, 'recordings'), where('participant', '==', participant)));
  querySnapshot.forEach(doc => {
    recordings.push(doc.data() as Recording);
  });
  return recordings;
}

export const addRecording = async (data: Recording): Promise<void> => {
  try {
    await addDoc(collection(database, 'recordings'), data);
  } catch (e) {
    console.error(e);
  }
}

export const addText = async (data: ParaText): Promise<void> => {
  try {
    await addDoc(collection(database, 'texts'), data);
  } catch (e) {
    console.error(e);
  }
}

// export const addTranscription = (data: Transcription) => {
//   try {
//     addDoc(collection(database, 'transcriptions'), data);
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const addRecording = (data: Recording) => {
//   try {
//     addDoc(collection(database, 'recordings'), data);
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const fetchText = async (id: string): Promise<Text | null> => {
//   const docRef = doc(database, 'text', id);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     return docSnap.data() as Text;
//   } else {
//     console.log('No such document!');
//   }
//   return null;
// };


// export const fetchAudio = async (id: string): Promise<Audio | null> => {
//   const docRef = doc(database, 'audio', id);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     return docSnap.data() as Audio;
//   } else {
//     console.log('No such document!');
//   }
//   return null;
// };

// export const fetchAudios = async (): Promise<Audio[]> => {
//   const audios: Audio[] = [];
//   const querySnapshot = await getDocs(
//     query(collection(database, 'audio'), where('participant', '==', '2'))
//   );
//   querySnapshot.forEach(doc => {
//     audios.push(doc.data() as Audio);
//   });
//   return audios;
// };
