'use client';

import { Badge } from "@/components/badge";
import { useStudy2Store } from '@/lib/zustand'
import { useEffect } from "react";


interface CountBadgeProps {
  dataLength: number;
  submittedDataLength: number;
}

export const CountBadge: React.FC<CountBadgeProps> = ({ dataLength, submittedDataLength }) => {
  const submittedDataLengthState = useStudy2Store((state) => state.count);
  const dataLengthState = useStudy2Store((state) => state.total);
  const setCount = useStudy2Store((state) => state.setCount);
  const setTotal = useStudy2Store((state) => state.setTotal);

  useEffect(() => {
    if (submittedDataLengthState !== submittedDataLength) {
      setCount(submittedDataLength);
    }
    if (dataLengthState !== dataLength) {
      setTotal(dataLength);
    }
  }, [submittedDataLength, dataLength, submittedDataLengthState, dataLengthState, setCount, setTotal]);

  return <div className="flex h-full items-end space-x-2 mr-6 align-bottom">
    <span className="text-sm">진행 개수</span>
    <Badge variant="secondary" className="bg-gray-300">
      {submittedDataLengthState} / {dataLengthState}
    </Badge>
  </div>;
}
