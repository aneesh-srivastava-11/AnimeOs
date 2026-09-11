'use client';

import React from 'react';
import { Sparkles, ExternalLink, Star, Film } from 'lucide-react';
import { RecommendedAnimeCard } from '@/lib/recommendations/recommendationEngine';

interface RecommendationCardProps {
  item: RecommendedAnimeCard;
}

export function RecommendationCard({ item }: RecommendationCardProps) {
  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/60 p-5 flex flex-col md:flex-row gap-5">
      {/* Cover Image & Match Badge */}
      <div className="relative shrink-0 w-full md:w-44 aspect-[3/4] rounded-xl overflow-hidden bg-slate-950">
        {item.coverImage ? (
          <img
            src={item.coverImage}
            alt={item.titleRomaji}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-600 text-xs">
            No Image
          </div>
        )}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-lg bg-indigo-600/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white shadow-lg border border-indigo-400/30">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{item.matchScore}% Match</span>
        </div>
      </div>

      {/* Details & Explanation Box */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="font-display text-lg font-bold text-white">{item.titleRomaji}</h3>
              {item.titleEnglish && item.titleEnglish !== item.titleRomaji && (
                <p className="text-xs text-slate-400">{item.titleEnglish}</p>
              )}
            </div>
            <a
              href={item.siteUrl || `https://anilist.co/anime/${item.anilistId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors shrink-0"
            >
              <span>AniList</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-md bg-slate-950 px-2 py-0.5 text-[10px] font-semibold text-slate-300 border border-slate-800">
              {item.format || 'TV'} • {item.episodes || '?'} eps
            </span>
            {item.averageScore && (
              <span className="flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
                <Star className="h-3 w-3 fill-amber-400" />
                {item.averageScore}% Score
              </span>
            )}
            {item.genres.map((g) => (
              <span
                key={g}
                className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-300 border border-indigo-500/20"
              >
                {g}
              </span>
            ))}
          </div>

          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
            {item.description}
          </p>
        </div>

        {/* Human-Readable Explanation Box */}
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-3.5">
          <p className="text-[11px] font-semibold text-indigo-300 mb-1 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            WHY THIS WAS RECOMMENDED:
          </p>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            {item.whyExplanation}
          </p>
        </div>
      </div>
    </div>
  );
}
