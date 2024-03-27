'use client';

import { Button } from '@/components/button';
import { EditPassword, verifyPassword } from '@/lib/api';
import { cn, createAndStoreToken, hashing } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({}: {}) {
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [participantNum, setParticipantNum] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (newPassword !== '' && repeatPassword !== '' && newPassword === repeatPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [newPassword, repeatPassword]);

  const handleParticipantNumChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setParticipantNum(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setNewPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setRepeatPassword(event.target.value);
  };

  const onSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    const valid = await EditPassword(participantNum, password, newPassword);
    if (valid) {
      setIsErrorMessageOpen(false);
      router.push('/login?study=2');
    } else {
      setIsErrorMessageOpen(true);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="flex flex-col w-96">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium" htmlFor="labelName">
            참가자 번호
          </label>
          <input
            className="border-gray-300 shadow-sm p-2 border rounded-md"
            id="participantnum-input"
            placeholder="P1"
            type="text"
            onChange={handleParticipantNumChange}
          />
        </div>
        <div className="flex flex-col space-y-2 mt-2">
          <label className="text-sm font-medium" htmlFor="labelName">
            기존 비밀번호
          </label>
          <input
            className="border-gray-300 shadow-sm p-2 border rounded-md"
            id="password-input"
            placeholder="******"
            type="password"
            onChange={handlePasswordChange}
          />
        </div>
        <div
            className={cn('text-xs mt-2 transition-all duration-500', {
              'max-h-12': isErrorMessageOpen,
              'max-h-0 overflow-hidden': !isErrorMessageOpen,
            })}
          >
            <p className="text-red-400">비밀번호가 잘못되었습니다</p>
          </div>
        <div className="flex flex-col space-y-2 mt-2">
          <label className="text-sm font-medium" htmlFor="labelName">
            새로운 비밀번호
          </label>
          <input
            className="border-gray-300 shadow-sm p-2 border rounded-md"
            id="newpassword-input"
            placeholder="새로운 비밀번호"
            type="password"
            onChange={handleNewPasswordChange}
          />
        </div>
        <div className="flex flex-col space-y-2 mt-2">
          <label className="text-sm font-medium" htmlFor="labelName">
            새로운 비밀번호 확인
          </label>
          <input
            className="border-gray-300 shadow-sm p-2 border rounded-md"
            id="password-input"
            placeholder="새로운 비밀번호 확인"
            type="password"
            onChange={handleRepeatPasswordChange}
          />
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
