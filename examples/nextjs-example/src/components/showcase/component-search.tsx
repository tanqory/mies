'use client';

import React from 'react';
import {
  Input,
  LucideIcons,
} from '@tanqory/mies';

interface ComponentSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function ComponentSearch({
  value,
  onChange,
  placeholder = 'Search components...',
  className
}: ComponentSearchProps) {
  return (
    <div className={`relative ${className}`}>
      <LucideIcons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <LucideIcons.X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}