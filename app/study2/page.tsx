import { UserRecording } from '@/lib/definition';
import { shuffle } from '@/lib/utils';
import { Study2TableRow } from '@/components/study2/table-row';
import { getUserSubmittedRecordings } from '@/lib/api';
import { MyTable } from '@/components/my-table';
import { Suspense } from 'react';
import { ExitStatus } from '@/components/study2/exit-status';

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { participant } = searchParams as { [key: string]: string };
  const datas: UserRecording[] = shuffle(
    await getUserSubmittedRecordings(participant)
  );
  const dataLength = datas.length;
  const submittedDataLength = datas.filter(data => data.isSubmitted).length;
  return (
    <div className="w-4/5 mx-auto">
    {/* <div className="w-4/5 mx-auto p-4"> */}
      <div className="items-center justify-center relative h-full">
      <div className="flex justify-between items-end sticky top-0 py-4 w-full z-10 bg-gray-50 border-b">
          <div>
            <p className="text-xl">
              다음 텍스트를 주어진 뉘앙스가 잘 느껴지도록 말해보세요:
            </p>
            <p className="mt-1 text-lg font-bold">
              &apos;지금 방에서 나갈 거예요. 하지만 나중에 돌아올 거예요.&apos;
            </p>
          </div>
          <ExitStatus dataLength={dataLength} submittedDataLength={submittedDataLength}/>
        </div>
        {/* <div className='mt-12 overflow-y-auto w-full'> */}
        <div className='overflow-y-auto w-full'>
          <MyTable>
            {datas.map((data, index) => (
              <Suspense key={index}>
                <Study2TableRow
                  key={index}
                  participant={participant}
                  emotion={data.emotion}
                  tone={data.tone}
                  recordingURL={data.recordingURL}
                  description={data.description}
                  isUserSubmitted={data.isSubmitted}
                />
              </Suspense>
            ))}
          </MyTable>
        </div>
      </div>
    </div>
  );
}

