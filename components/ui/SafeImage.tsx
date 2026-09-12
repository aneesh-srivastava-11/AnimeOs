'use client';

import React, { useState, useEffect } from 'react';
import { getImageCandidates } from '@/lib/utils/imageUtils';

interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  fallbackLabel?: string;
}

export function SafeImage({
  src,
  alt = '',
  className = '',
  fallbackLabel,
  onError,
  ...props
}: SafeImageProps) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [candidates, setCandidates] = useState<string[]>([]);

  useEffect(() => {
    const list = getImageCandidates(typeof src === 'string' ? src : null);
    setCandidates(list);
    setCandidateIndex(0);
  }, [src]);

  const currentSrc = candidates[candidateIndex] || (typeof src === 'string' ? src : undefined);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (candidateIndex + 1 < candidates.length) {
      // Try next image candidate (e.g. image proxy mirror)
      setCandidateIndex((prev) => prev + 1);
    } else {
      // Execute custom onError if provided
      if (onError) {
        onError(e);
      }
    }
  };

  if (!currentSrc || (candidates.length > 0 && candidateIndex >= candidates.length)) {
    return (
      <div
        className={`flex items-center justify-center bg-[#18181C] text-[#71717A] font-semibold text-xs rounded border border-[#27272A] ${className}`}
      >
        {fallbackLabel || alt || 'Image'}
      </div>
    );
  }

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={handleError}
    />
  );
}

