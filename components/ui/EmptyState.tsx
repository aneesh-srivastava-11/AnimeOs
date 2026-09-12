'use client';

import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = 'Your Anime DNA is still forming',
  description = 'Watch and rate more anime on AniList to unlock deeper taste insights.',
  icon: Icon = Sparkles,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="obsidian-card p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-base font-semibold text-[#F4F4F5]">{title}</h3>
      <p className="text-xs text-[#71717A] mt-1.5 leading-relaxed max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 rounded-lg bg-[#6366F1] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4F46E5] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
