'use client';

import { Button } from '@/app/ui/button';
import { link } from 'fs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';


export default function Page() {
  const searchParams = useSearchParams()
  const search = searchParams.get('study')

  const [linkHref, setLinkHref] = useState('')
  const handleParticipantNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    search === '1' ? setLinkHref(`/study1?participant=${event.target.value}`) : setLinkHref(`/study2?participant=${event.target.value}`);
  }
  
  return (
    <div className="flex h-screen items-center justify-center">
      <form className="flex flex-col gap-4 w-96">
        <div className="flex flex-col space-y-4">
          <label className="text-sm font-medium" htmlFor="labelName">
            참가자 번호 입력
          </label>
          <input
            className="border-gray-300 shadow-sm p-2 border rounded-md"
            id="participantnum-input"
            placeholder="P1"
            type="text"
            onChange={handleParticipantNumChange}
          />
        </div>
        <Link href={linkHref}>
        <Button>시작하기</Button>
        </Link>
      </form>
    </div>
  );
}
