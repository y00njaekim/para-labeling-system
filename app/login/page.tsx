'use client';

import { Button } from '@/components/button';
import { validatePassword } from '@/lib/api';
import { cn, createAndStoreToken, hashing } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { study } = searchParams as { [key: string]: string };
  const [linkHref, setLinkHref] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isPasswordNotCorrectDivOpen, setIsPasswordNotCorrectDivOpen] =
    useState(false);
  const [participantNum, setParticipantNum] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (searchParams) {
      setLinkHref(`/study${study}`);
    } else {
      setLinkHref('');
    }
  }, [searchParams, study]);

  const handleParticipantNumChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const value = event.target.value;
    const isValidInput = /^P\d{1,2}$/.test(value);
    setIsValid(isValidInput);
    setParticipantNum(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const onSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    const valid = await validatePassword(participantNum, password);
    if (valid) {
      createAndStoreToken(participantNum);
      setIsPasswordNotCorrectDivOpen(false);
      router.push(linkHref);
    } else {
      setIsPasswordNotCorrectDivOpen(true);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {/* <form className="flex flex-col gap-4 w-96"> */}
      <form className="flex flex-col w-96">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium" htmlFor="labelName">
            참가자 번호
          </label>
          <input
            className="border-gray-300 shadow-sm p-2 border rounded-md"
            id="participantnum-input"
            placeholder="P1 (대문자 P + 숫자)"
            type="text"
            onChange={handleParticipantNumChange}
          />
        </div>
        <div className="flex flex-col space-y-2 mt-2">
          {/* <div className="flex flex-col"> */}
          <label className="text-sm font-medium" htmlFor="labelName">
            비밀번호
          </label>
          <input
            className="border-gray-300 shadow-sm p-2 border rounded-md"
            id="password-input"
            placeholder="******"
            type="password"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex justify-between">
          <div className="text-xs mt-2">
            <Link className="text-blue-400 hover:text-blue-300" href="/registration">
              비밀번호등록하기
            </Link>
          </div>
          <div
            className={cn('text-xs mt-2', {
              'max-h-12': isPasswordNotCorrectDivOpen,
              'max-h-0 overflow-hidden': !isPasswordNotCorrectDivOpen,
            })}
          >
            <p className="text-red-400">비밀번호가 잘못되었습니다</p>
          </div>
        </div>
        <div className="flex items-top justify-between mt-2">
          <Button
            className={cn({
              'bg-gray-300 pointer-events-none': !isValid,
            })}
            onClick={onSubmit}
            type="button"
          >
            시작하기
          </Button>
        </div>
      </form>
    </div>
  );
}
