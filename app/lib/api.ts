import { fileUpload } from "@/app/lib/storage";
import { Recording } from "@/app/lib/definition";
import { Timestamp } from "@firebase/firestore";
import { addRecording } from "@/app/lib/data";

export const uploadRecording = async (file: any, participant: string, text: string, nuance: string[]) => {
  const fileUrl = await fileUpload(file, 'recordings');
  const data: Recording = {
    fileUrl: fileUrl,
    participant: participant,
    text: text,
    nuance: nuance,
    createdAt: Timestamp.now(),
  };
  addRecording(data);
}