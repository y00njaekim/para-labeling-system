import { fetchAudios } from '@/app/lib/data';
import { StudyOne } from '@/app/ui/study1/client-component';
import { Audio } from '@/app/lib/definition';
import { ParticipantCheckModal } from '../ui/participant-check-modal';


export default async function Page() {
  const audios: Audio[] = await fetchAudios();
  return (
    <div className="flex h-screen items-center justify-center">
      <StudyOne audios={audios} />
      <ParticipantCheckModal />
    </div>
  );
}
