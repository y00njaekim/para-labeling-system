'use client';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { addText } from '@/lib/data';
import { MyTableRow } from '@/components/table-row';
import { useStudy1Store } from '@/lib/zustand';


interface Study1TableRowProps {
  key: number;
  participant: string;
  emotion: string;
  text: string;
  tone: string;
  description: string;
  isUserSubmitted: boolean;
}

export const Study1TableRow: React.FC<Study1TableRowProps> = ({
  key,
  participant,
  emotion,
  text,
  tone,
  description,
  isUserSubmitted,
}) => {
  const increaseCount = useStudy1Store((state) => state.increase);
  const decreaseCount = useStudy1Store((state) => state.decrease);
  const [inputValue, setInputValue] = useState(text);
  const [isSubmitted, setIsSubmitted] = useState(isUserSubmitted);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log(inputValue);
    addText({
      emotion,
      tone,
      participant,
      text: inputValue,
      createdAt: Timestamp.now(),
    });
    increaseCount();
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    decreaseCount();
    setIsSubmitted(false);
  };

  return (
    <MyTableRow
      key={key}
      tone={tone}
      description={description}
      isSubmitted={isSubmitted}
    >
      {isSubmitted ? (
        <>
          <span className='flex items-center'>{inputValue}</span>
          <div className='flex items-center min-w-16'>
            <Button onClick={handleEdit}>수정</Button>
          </div>
        </>
      ) : (
        <>
          <Input
            placeholder="지금 방에서 나갈 거예요. 하지만 나중에 돌아올 거예요."
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className='flex items-center min-w-16'>
            <Button className='' onClick={handleSubmit}>제출</Button>
          </div>
        </>
      )}
    </MyTableRow>
  );
};
