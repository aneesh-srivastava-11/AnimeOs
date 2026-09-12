'use client';

import React from 'react';
import { CharacterMatch } from '@/types/analytics';
import { Sparkles, UserCheck } from 'lucide-react';

interface CharacterMatchCardProps {
  match?: CharacterMatch;
}

export function CharacterMatchCard({ match }: CharacterMatchCardProps) {
  if (!match) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#27272A] bg-gradient-to-br from-[#12121A] via-[#0F0F14] to-[#09090B] p-6 sm:p-8 shadow-2xl">
      {/* Background Radial Backlight */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#6366F1]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: Persona Details */}
        <div className="flex items-start sm:items-center gap-5 flex-1">
          <div className="relative shrink-0">
            <img
              src={match.avatarUrl}
              alt={match.characterName}
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover border-2 border-[#6366F1]/40 shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#6366F1] text-white shadow-md">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3 py-0.5 text-[11px] font-semibold text-[#818CF8]">
              <Sparkles className="h-3 w-3" />
              <span>YOUR ANIME PERSONALITY</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F5]">
                You are <span className="text-[#6366F1]">{match.characterName}</span>
              </h2>
              <span className="text-xs text-[#A1A1AA]">({match.animeTitle})</span>
            </div>

            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-xl">
              {match.description}
            </p>

            <p className="text-xs font-mono italic text-[#71717A] pt-1">
              "{match.quote}"
            </p>
          </div>
        </div>

        {/* Right: Compatibility Score Badge & Trait Overlaps */}
        <div className="w-full md:w-72 shrink-0 rounded-xl border border-[#27272A] bg-[#0F0F12]/80 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1F1F22] pb-2">
            <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
              Compatibility Match
            </span>
            <span className="font-display text-xl font-bold text-[#34D399]">
              {match.matchPercentage}%
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
              Top Trait Overlaps
            </p>
            {match.overlappingTraits.map((t, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#F4F4F5]">{t.trait}</span>
                  <span className="text-[#818CF8] font-medium">{t.matchScore}% match</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#18181C] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] transition-all duration-500"
                    style={{ width: `${t.matchScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
