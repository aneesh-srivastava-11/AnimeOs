'use client';

import React, { useState } from 'react';
import { AnimeAwardItem } from '@/types/analytics';
import { Trophy, Brain, Heart, Star, Share2 } from 'lucide-react';
import { SafeImage } from '@/components/ui/SafeImage';
import { ShareableAnimeCardModal, AnimeShareData } from '@/components/ui/ShareableAnimeCardModal';

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
  const [selectedAwardForShare, setSelectedAwardForShare] = useState<AnimeShareData | null>(null);

  if (!awards || awards.length === 0) return null;

  return (
    <>
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

            const handleShare = () => {
              setSelectedAwardForShare({
                id: `award-${idx}`,
                titleRomaji: award.animeTitle,
                coverImage: award.coverImage,
                score: award.userScore,
                whyExplanation: `${award.category}: ${award.reason}`,
              });
            };

            return (
              <div
                key={idx}
                onClick={handleShare}
                className="group rounded-xl border border-[#27272A] bg-[#0F0F12] p-4 space-y-2 relative overflow-hidden hover:border-[#6366F1]/50 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between gap-2 text-[#F4B860]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] truncate">
                      {award.category}
                    </span>
                  </div>
                  <Share2 className="h-3 w-3 text-[#71717A] group-hover:text-[#818CF8] transition-colors shrink-0" />
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <SafeImage
                    src={award.coverImage}
                    alt={award.animeTitle}
                    className="h-12 w-9 rounded object-cover border border-[#27272A] shrink-0"
                    fallbackLabel={award.animeTitle}
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs text-[#F4F4F5] truncate group-hover:text-[#6366F1] transition-colors">
                      {award.animeTitle}
                    </h4>
                    <p className="text-[10px] text-[#6366F1] font-semibold">
                      {award.userScore}/10 Rating
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-[#71717A] leading-relaxed line-clamp-2">
                  {award.reason}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <ShareableAnimeCardModal
        isOpen={!!selectedAwardForShare}
        onClose={() => setSelectedAwardForShare(null)}
        anime={selectedAwardForShare}
      />
    </>
  );
}

