'use client';

import * as React from 'react';
import { cn } from '@/lib/utils'; // or replace with normal string if you don't have cn
import { Star } from 'lucide-react';

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  onValueChange?: (value: number) => void;
  readOnly?: boolean;
  max?: number;
  size?: number;
}

export function Rating({
  value = 0,
  onValueChange,
  readOnly = false,
  max = 5,
  size = 24,
  className,
  ...props
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div className={`${className || ''} flex gap-1`} {...props}>
      {Array.from({ length: max }).map((_, i) => {
        const index = i + 1;
        const filled = hovered ? index <= hovered : index <= value;

        return (
          <Star
            key={index}
            className={`cursor-pointer transition-colors ${filled ? 'text-yellow-400' : 'text-muted-foreground'}`}
            size={size}
            onClick={() => !readOnly && onValueChange?.(index)}
            onMouseEnter={() => !readOnly && setHovered(index)}
            onMouseLeave={() => !readOnly && setHovered(null)}
          />
        );
      })}
    </div>
  );
}
