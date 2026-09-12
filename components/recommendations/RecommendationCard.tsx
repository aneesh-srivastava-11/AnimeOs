'use client';

import React, { useState } from 'react';
import { Sparkles, ExternalLink, Star, Share2 } from 'lucide-react';
import { RecommendedAnimeCard } from '@/lib/recommendations/recommendationEngine';
import { SafeImage } from '@/components/ui/SafeImage';
import { ShareableAnimeCardModal, AnimeShareData } from '@/components/ui/ShareableAnimeCardModal';

interface RecommendationCardProps {
  item: RecommendedAnimeCard;
}

export function RecommendationCard({ item }: RecommendationCardProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const animeShareData: AnimeShareData = {
    id: String(item.anilistId),
    titleRomaji: item.titleRomaji,
    titleEnglish: item.titleEnglish,
    coverImage: item.coverImage,
    averageScore: item.averageScore,
    episodes: item.episodes,
    format: item.format,
    genres: item.genres,
    whyExplanation: item.whyExplanation,
    anilistId: item.anilistId,
  };

  return (
    <>
      <div className="obsidian-card-elevated obsidian-card-hover p-5 flex flex-col md:flex-row gap-5">
        {/* Cover Image & Match Badge */}
        <div className="relative shrink-0 w-full md:w-40 aspect-[2/3] rounded-lg overflow-hidden bg-[#09090B]">
          <SafeImage
            src={item.coverImage}
            alt={item.titleRomaji}
            className="h-full w-full object-cover"
            fallbackLabel={item.titleRomaji}
          />
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-md bg-[#6366F1] px-2.5 py-1 text-xs font-bold text-white shadow-lg">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{item.matchScore}% MATCH</span>
          </div>
        </div>

        {/* Details & Reason Box */}
        <div className="flex flex-col justify-between flex-1 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-[#F4F4F5] uppercase tracking-tight">
                  {item.titleRomaji}
                </h3>
                {item.titleEnglish && item.titleEnglish !== item.titleRomaji && (
                  <p className="text-xs text-[#A1A1AA]">{item.titleEnglish}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#27272A] bg-[#09090B] px-3 py-1.5 text-xs font-semibold text-[#818CF8] hover:bg-[#6366F1] hover:text-white transition-colors"
                >
                  <Share2 className="h-3 w-3" />
                  <span>Share Card</span>
                </button>

                <a
                  href={item.siteUrl || `https://anilist.co/anime/${item.anilistId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-[#27272A] bg-[#09090B] px-3 py-1.5 text-xs font-medium text-[#F4F4F5] hover:bg-[#141417] transition-colors"
                >
                  <span>AniList</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#09090B] px-2 py-0.5 text-[10px] font-semibold text-[#A1A1AA] border border-[#27272A]">
                {item.format || 'TV'} · {item.episodes || '?'} eps
              </span>
              {item.averageScore && (
                <span className="flex items-center gap-1 rounded bg-[#F4B860]/10 px-2 py-0.5 text-[10px] font-semibold text-[#F4B860] border border-[#F4B860]/20">
                  <Star className="h-3 w-3 fill-[#F4B860]" />
                  {item.averageScore}% AniList Score
                </span>
              )}
              {item.genres.map((g) => (
                <span
                  key={g}
                  className="rounded bg-[#6366F1]/10 px-2 py-0.5 text-[10px] font-medium text-[#6366F1] border border-[#6366F1]/20"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-3 font-sans">
              {item.description}
            </p>
          </div>

          {/* Why you'll like it Box */}
          <div className="rounded-lg border border-[#27272A] bg-[#09090B] p-3.5 space-y-1">
            <p className="text-[10px] font-bold text-[#6366F1] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              WHY YOU'LL LIKE IT
            </p>
            <p className="text-xs text-[#F4F4F5] leading-relaxed font-sans">
              {item.whyExplanation}
            </p>
          </div>
        </div>
      </div>

      <ShareableAnimeCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        anime={animeShareData}
      />
    </>
  );
}

