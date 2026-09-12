'use client';

import React from 'react';
import { HotTakeItem } from '@/types/analytics';
import { Flame, ThumbsUp, ThumbsDown } from 'lucide-react';

interface HotTakesCardProps {
  hotTakes?: HotTakeItem[];
}

export function HotTakesCard({ hotTakes }: HotTakesCardProps) {
  if (!hotTakes || hotTakes.length === 0) return null;

  return (
    <div className="obsidian-card p-6 space-y-4">
      <div className="flex items-center gap-2 text-[#EF4444]">
        <Flame className="h-4 w-4" />
        <h3 className="font-display text-base font-bold text-[#F4F4F5]">
          Your Hot Takes & Controversial Ratings
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {hotTakes.map((item) => {
          const isOverratedByYou = item.type === 'overrated_by_you';
          const Icon = isOverratedByYou ? ThumbsDown : ThumbsUp;

          return (
            <div
              key={item.id}
              className="flex items-center gap-3.5 rounded-xl border border-[#27272A] bg-[#0F0F12] p-3 hover:border-[#3F3F46] transition-colors"
            >
              {item.coverImage ? (
                <img
                  src={item.coverImage}
                  alt={item.animeTitle}
                  className="h-14 w-10 rounded-md object-cover border border-[#27272A] shrink-0"
                />
              ) : (
                <div className="flex h-14 w-10 items-center justify-center rounded-md bg-[#18181C] text-xs font-bold text-[#71717A] shrink-0">
                  ?
                </div>
              )}

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-semibold text-xs text-[#F4F4F5] truncate">
                    {item.animeTitle}
                  </h4>
                  <Icon className={`h-3.5 w-3.5 ${isOverratedByYou ? 'text-rose-400' : 'text-emerald-400'} shrink-0`} />
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                  <span className="font-bold text-[#6366F1]">You: {item.userScore}</span>
                  <span className="text-[#71717A]">vs</span>
                  <span className="text-[#A1A1AA]">AniList: {item.anilistScore}</span>
                </div>

                <p className="text-[10px] text-[#71717A] line-clamp-1">
                  {item.headline}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
