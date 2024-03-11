'use client';

import { Button } from '@/components/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { study } = searchParams as { [key: string]: string };
  const [linkHref, setLinkHref] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleParticipantNumChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const isValidInput = /^P\d{1,2}$/.test(value);
    setIsValid(isValidInput);

    if (isValidInput && searchParams) {
      study === '1'
        ? setLinkHref(`/study1?participant=${value}`)
        : setLinkHref(`/study2?participant=${value}`);
    } else {
      setLinkHref(``);
    }
  };

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
          <Button
            className={cn({
              'bg-gray-300 pointer-events-none': !isValid,
            })}
          >
            시작하기
          </Button>
        </Link>
      </form>
    </div>
  );
}
