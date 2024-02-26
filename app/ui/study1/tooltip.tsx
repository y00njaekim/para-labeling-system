// Tooltip.tsx
'use client';
import { useState } from 'react';
import { InfoIcon } from '@/app/ui/icon';

interface TooltipProps {
  message: string;
}

export const Tooltip = ({ message }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative"
    >
      <InfoIcon className="w-4 h-4 text-gray-500" />
      {showTooltip && (
        <div className="absolute -left-20 mt-2 w-48 p-2 bg-black text-white text-sm rounded-md">
          {message}
        </div>
      )}
    </div>
  );
};
