'use client';

import { Button } from '@/components/button';
import { verifyPassword } from '@/lib/api';
import { cn, createAndStoreToken, hashing } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const { study } = searchParams as { [key: string]: string }; // study = '1' or '2'

  const [linkHref, setLinkHref] = useState('');
  const [isValidPNum, setIsValidPNum] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [participantNum, setParticipantNum] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (searchParams) {
      setLinkHref(`/study${study}`);
    } else {
      setLinkHref('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleParticipantNumChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pNum = event.target.value;
    const pNumValidity = /^P\d{1,2}$/.test(pNum);
    setIsValidPNum(pNumValidity);
    setParticipantNum(pNum);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPassword(password);
  };

  const onSubmit = async (event: React.FormEvent) => {
    const passwordMatch = await verifyPassword(participantNum, password);
    if (passwordMatch) {
      createAndStoreToken(participantNum);
      setIsPasswordCorrect(true);
      router.push(linkHref);
    } else {
      setIsPasswordCorrect(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm onSubmit={onSubmit}>
        <InputGroup>
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
        </InputGroup>
        <InputGroup>
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
        </InputGroup>
        <div className="flex justify-between">
          <RegistrationLink />
          <PasswordErrorMessage isPasswordCorrect={isPasswordCorrect} />
        </div>
        <div className="flex items-top justify-between mt-2">
          <Button disabled={!isValidPNum} type="submit">
            시작하기
          </Button>
        </div>
      </LoginForm>
    </div>
  );
}

const LoginForm = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent) => Promise<void>;
}) => {
  return (
    <form className="flex flex-col w-96" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

const InputGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col space-y-2 mt-2">{children}</div>;
};

const RegistrationLink = () => {
  return (
    <div className="text-xs mt-2">
      <Link className="text-blue-400 hover:text-blue-300" href="/registration">
        비밀번호등록하기
      </Link>
    </div>
  );
};

const PasswordErrorMessage = ({
  isPasswordCorrect,
}: {
  isPasswordCorrect: boolean;
}) => {
  return (
    <div
      className={cn('text-xs mt-2', {
        'max-h-12': !isPasswordCorrect,
        'max-h-0 overflow-hidden': isPasswordCorrect,
      })}
    >
      <p className="text-red-400">비밀번호가 잘못되었습니다</p>
    </div>
  );
};
