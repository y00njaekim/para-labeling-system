'use client';

import React, { useState } from 'react';

interface TagsInputProps {
  initialTags?: string[];
  onTagsChange?: (tags: string[]) => void;
}

export const TagsInput: React.FC<TagsInputProps> = ({ initialTags = [] , onTagsChange }) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState<string>('');

  const updateTags = (newTags: string[]) => {
    setTags(newTags);
    if(onTagsChange) {
      onTagsChange(newTags);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.includes(',')) {
      const newTags = e.target.value.split(',').filter((tag) => tag.trim() !== '');
      setTags((prevTags) => [...prevTags, ...newTags]);
      updateTags([...tags, ...newTags]);

      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    updateTags(tags.filter((_, i) => i !== index)); // Use updateTags here as well
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="mt-2 p-2 w-full border rounded-md"
        placeholder="태그 입력 후 ,(쉼표) 사용"
      />
      <div className="flex flex-wrap gap-2 mt-2 min-h-8">
        {tags.map((tag, index) => (
          <div
            key={tag}
            className="bg-gray-200 rounded px-4 py-1 flex items-center justify-between"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
