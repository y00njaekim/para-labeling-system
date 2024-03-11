'use client';

import { Badge } from "@/components/badge";
import { useStudy2Store } from '@/lib/zustand'
import { useEffect } from "react";


interface CountBadgeProps {
  dataLength: number;
  submittedDataLength: number;
}

export const CountBadge: React.FC<CountBadgeProps> = ({ dataLength, submittedDataLength }) => {
  const { setCount, setTotal } = useStudy2Store();

  // 컴포넌트 마운트 시 한 번만 상태 초기화
  useEffect(() => {
    setCount(submittedDataLength);
    setTotal(dataLength);
  }, [setCount, setTotal]);

  // 사용되는 상태를 직접 구독
  const count = useStudy2Store(state => state.count);
  const total = useStudy2Store(state => state.total);

  return <div className="flex h-full items-end space-x-2 mr-6 align-bottom">
    <span className="text-sm">진행 개수</span>
    <Badge variant="secondary" className="bg-gray-300">
      {count} / {total}
    </Badge>
  </div>;
}
