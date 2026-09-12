'use client';

import React, { useState } from 'react';
import { HotTakeItem } from '@/types/analytics';
import { Flame, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import { SafeImage } from '@/components/ui/SafeImage';
import { ShareableAnimeCardModal, AnimeShareData } from '@/components/ui/ShareableAnimeCardModal';

interface HotTakesCardProps {
  hotTakes?: HotTakeItem[];
}

export function HotTakesCard({ hotTakes }: HotTakesCardProps) {
  const [selectedHotTakeForShare, setSelectedHotTakeForShare] = useState<AnimeShareData | null>(null);

  if (!hotTakes || hotTakes.length === 0) return null;

  return (
    <>
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

            const handleShare = () => {
              setSelectedHotTakeForShare({
                id: item.id,
                titleRomaji: item.animeTitle,
                coverImage: item.coverImage,
                score: item.userScore,
                averageScore: item.anilistScore,
                whyExplanation: item.headline,
              });
            };

            return (
              <div
                key={item.id}
                onClick={handleShare}
                className="group flex items-center gap-3.5 rounded-xl border border-[#27272A] bg-[#0F0F12] p-3 hover:border-[#6366F1]/50 cursor-pointer transition-colors"
              >
                <div className="h-14 w-10 shrink-0 overflow-hidden rounded-md border border-[#27272A] bg-[#18181C]">
                  <SafeImage
                    src={item.coverImage}
                    alt={item.animeTitle}
                    className="h-full w-full object-cover"
                    fallbackLabel={item.animeTitle}
                  />
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-semibold text-xs text-[#F4F4F5] truncate group-hover:text-[#6366F1] transition-colors">
                      {item.animeTitle}
                    </h4>
                    <div className="flex items-center gap-1 shrink-0">
                      <Share2 className="h-3 w-3 text-[#71717A] group-hover:text-[#818CF8] transition-colors" />
                      <Icon className={`h-3.5 w-3.5 ${isOverratedByYou ? 'text-rose-400' : 'text-emerald-400'}`} />
                    </div>
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

      <ShareableAnimeCardModal
        isOpen={!!selectedHotTakeForShare}
        onClose={() => setSelectedHotTakeForShare(null)}
        anime={selectedHotTakeForShare}
      />
    </>
  );
}

