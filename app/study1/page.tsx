import { UserParaText } from '@/lib/definition';
import { shuffle } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table';
import { Study1TableRow } from '@/components/study1/table-row';
import { getUserSubmittedTexts } from '@/lib/api';
import { MyTable } from '@/components/my-table';
import { CountBadge } from '@/components/study1/count-badge';

// TODO Style
// TODO Feature: 사용 가능한 구두점 보여주는 방법 고안
// TODO Function: 완료 버튼 만들고 모든 입력 완료되면 완료 버튼 활성화

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { participant } = searchParams as { [key: string]: string };
  const datas: UserParaText[] = shuffle(
    await getUserSubmittedTexts(participant)
  );
  const dataLength = datas.length;
  const submittedDataLength = datas.filter(data => data.isSubmitted).length;
  return (
    <div className="w-4/5 mx-auto p-4">
      <div className="h-screen items-center justify-center">
        <div className="flex justify-between items-end mt-4 mb-8">
          <div>
            <p className="text-xl">
              다음 텍스트를 주어진 뉘앙스가 잘 느껴지도록 수정해보세요:
            </p>
            <p className="mt-1 text-lg font-bold">
              &apos;지금 방에서 나갈 거예요. 하지만 나중에 돌아올 거예요.&apos;
            </p>
          </div>
          <CountBadge
            dataLength={dataLength}
            submittedDataLength={submittedDataLength}
          />
        </div>
        <MyTable>
          {datas.map((data, index) => (
            <Study1TableRow
              key={index}
              participant={participant}
              emotion={data.emotion}
              tone={data.tone}
              text={data.text}
              description={data.description}
              isUserSubmitted={data.isSubmitted}
            />
          ))}
        </MyTable>
      </div>
    </div>
  );
}
