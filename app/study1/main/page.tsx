import { Button } from '@/app/ui/button';

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-3/5 mx-auto p-4">
        <div className="flex items-center space-x-4">
          <Button className="p-2">
            <PlayIcon className="text-black" />
          </Button>
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: '25%',
              }}
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              1. 어떤 상황 속에서 느껴지나요? (3점 척도; 별로, 보통, 많이)
            </p>
            <InfoIcon className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center mt-2 space-x-4">
            <Button className="px-4 py-2">별로</Button>
            <Button className="px-4 py-2">보통</Button>
            <Button className="px-4 py-2">많이</Button>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              2. 상황이 / 상대방의 행동과 관련하여 스트레스를 받는다는 내용
              적어주세요.
            </p>
            <InfoIcon className="w-4 h-4 text-gray-500" />
          </div>
          <textarea
            className="mt-2 p-2 w-full h-24 border rounded-md"
            placeholder="내용을 입력해 주세요."
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button>다음</Button>
        </div>
      </div>
    </div>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
