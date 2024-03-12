import { storage } from '@/app/firebase.config';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export const fileUpload = (file: any, path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      snapshot => {
      },
      error => {
        reject(error)
      },
      () => {
        console.log("fileUpload Complete!")
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          resolve(downloadURL);
        });
      }
    );
  });
};
