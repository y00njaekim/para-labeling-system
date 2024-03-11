import { storage } from '@/app/firebase.config';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export const fileUpload = (file: any, path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        console.log("Snapshot")
      },
      error => {
        console.log("fileUpload Error")
        reject(error)
      },
      () => {
        console.log("fileUpload Return")
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          resolve(downloadURL);
        });
      }
    );
  });
};
