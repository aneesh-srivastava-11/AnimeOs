'use client';

import React from 'react';
import { YouVsAnilistBenchmark } from '@/types/analytics';
import { Users, TrendingUp } from 'lucide-react';

interface YouVsAnilistCardProps {
  benchmark?: YouVsAnilistBenchmark;
}

export function YouVsAnilistCard({ benchmark }: YouVsAnilistCardProps) {
  if (!benchmark) return null;

  return (
    <div className="obsidian-card p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1F1F22] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#6366F1]">
            <Users className="h-4 w-4" />
            <h3 className="font-display text-base font-bold text-[#F4F4F5]">
              You vs AniList Community
            </h3>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            How your watching habits and rating behavior compare to millions of AniList users.
          </p>
        </div>

        {/* Scoring Personality Badge */}
        <div className="rounded-xl border border-[#27272A] bg-[#141417] px-3.5 py-2 space-y-0.5 text-right shrink-0">
          <p className="text-[10px] font-semibold text-[#71717A] uppercase tracking-wider">
            SCORING PERSONALITY
          </p>
          <p className="text-xs font-bold text-[#6366F1]">
            {benchmark.scoringPersonality.type}
          </p>
        </div>
      </div>

      {/* Genre Comparisons */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#71717A] px-1">
          <span>GENRE PREFERENCE</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#6366F1]" /> YOU</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#3F3F46]" /> ANILIST</span>
          </div>
        </div>

        <div className="space-y-3">
          {benchmark.genreComparisons.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#F4F4F5]">{item.genre}</span>
                <span className="text-[11px] font-semibold text-[#34D399] flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {item.multiplier}× community average
                </span>
              </div>

              {/* Side by side progress bars */}
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 rounded-full bg-[#141417] overflow-hidden">
                  <div className="h-full bg-[#6366F1]" style={{ width: `${item.userPercentage}%` }} />
                </div>
                <div className="h-2 rounded-full bg-[#141417] overflow-hidden">
                  <div className="h-full bg-[#3F3F46]" style={{ width: `${item.anilistPercentage}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring Comparison Banner */}
      <div className="rounded-xl border border-[#27272A] bg-[#0F0F12] p-4 text-xs space-y-1">
        <div className="flex items-center justify-between font-semibold text-[#F4F4F5]">
          <span>Average Score: You ({benchmark.scoringPersonality.userAverage}) vs AniList ({benchmark.scoringPersonality.anilistAverage})</span>
          <span className="text-[#6366F1]">
            {benchmark.scoringPersonality.difference >= 0 ? `+${benchmark.scoringPersonality.difference}` : benchmark.scoringPersonality.difference} pts
          </span>
        </div>
        <p className="text-[#A1A1AA] leading-relaxed">
          {benchmark.scoringPersonality.description}
        </p>
      </div>
    </div>
  );
}
