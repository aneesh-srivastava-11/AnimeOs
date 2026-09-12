'use client';

import React from 'react';
import { AnimeAwardItem } from '@/types/analytics';
import { Trophy, Brain, Heart, Star } from 'lucide-react';

interface AnimeAwardsCardProps {
  awards?: AnimeAwardItem[];
}

const ICON_MAP: Record<string, any> = {
  Trophy,
  Brain,
  Heart,
  Star,
};

export function AnimeAwardsCard({ awards }: AnimeAwardsCardProps) {
  if (!awards || awards.length === 0) return null;

  return (
    <div className="obsidian-card p-6 space-y-4">
      <div className="flex items-center gap-2 text-[#F4B860]">
        <Trophy className="h-4 w-4" />
        <h3 className="font-display text-base font-bold text-[#F4F4F5]">
          Your Personal Anime Awards
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {awards.map((award, idx) => {
          const Icon = ICON_MAP[award.icon] || Trophy;

          return (
            <div
              key={idx}
              className="rounded-xl border border-[#27272A] bg-[#0F0F12] p-4 space-y-2 relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-[#F4B860]">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA]">
                  {award.category}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                {award.coverImage && (
                  <img
                    src={award.coverImage}
                    alt={award.animeTitle}
                    className="h-12 w-9 rounded object-cover border border-[#27272A] shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-[#F4F4F5] truncate">
                    {award.animeTitle}
                  </h4>
                  <p className="text-[10px] text-[#6366F1] font-semibold">
                    {award.userScore}/10 Rating
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-[#71717A] leading-relaxed">
                {award.reason}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
