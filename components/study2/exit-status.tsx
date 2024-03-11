'use client';

import { CountBadge } from '@/components/study2/count-badge';
import { Button } from '@/components/button';
import { useStudy2Store } from '@/lib/zustand';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ExitStatusProps {
  dataLength: number;
  submittedDataLength: number;
}

export const ExitStatus: React.FC<ExitStatusProps> = ({
  dataLength,
  submittedDataLength,
}) => {
  const submittedDataLengthState = useStudy2Store(state => state.count);
  const dataLengthState = useStudy2Store(state => state.total);
  const [isCompleted, setIsCompleted] = useState(false);
  const [linkHref, setLinkHref] = useState('');

  useEffect(() => {
    console.log('submittedDataLengthState', submittedDataLengthState);
    console.log('dataLengthState', dataLengthState);
    if (submittedDataLengthState === dataLengthState) {
      setIsCompleted(true);
      setLinkHref('/');
    } else {
      setIsCompleted(false);
      setLinkHref('');
    }
  }, [submittedDataLengthState, dataLengthState]);

  return (
    <div className="flex justify-center items-center p-4">
      <CountBadge
        dataLength={dataLength}
        submittedDataLength={submittedDataLength}
      />
      <Link href={linkHref}>
      <Button
        className={cn('mb-1', { 'bg-red-500 hover:bg-red-400': isCompleted, 'bg-gray-300 pointer-events-none': !isCompleted})}
        >
        실험 종료
      </Button>
        </Link>
    </div>
  );
};
