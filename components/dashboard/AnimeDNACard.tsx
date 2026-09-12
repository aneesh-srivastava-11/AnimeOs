'use client';

import React from 'react';
import { Dna, Sparkles } from 'lucide-react';
import { AnimeDNAGenre } from '@/types/analytics';

interface AnimeDNACardProps {
  dna: AnimeDNAGenre[];
  tasteScore?: number;
}

export function AnimeDNACard({ dna, tasteScore = 87 }: AnimeDNACardProps) {
  if (!dna || dna.length === 0) {
    return (
      <div className="obsidian-card p-8 text-center py-10">
        <Dna className="mx-auto h-8 w-8 text-[#6366F1] mb-2 animate-pulse" />
        <h3 className="font-display text-sm font-semibold text-[#F4F4F5]">Your Anime DNA is still forming</h3>
        <p className="text-xs text-[#71717A] mt-1">
          Complete and rate more anime on AniList to unlock deeper taste insights.
        </p>
      </div>
    );
  }

  // Generate a personalized summary quote based on top genres
  const topGenreNames = dna.slice(0, 2).map((g) => g.genre);
  const insightQuote = topGenreNames.length > 0
    ? `You gravitate toward intense, character-driven stories with ${topGenreNames.join(' and ')} themes.`
    : 'You enjoy a diverse mix of anime genres with strong story execution.';

  return (
    <div className="obsidian-card-elevated p-6 space-y-6">
      {/* Header with Title & Taste Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Dna className="h-4 w-4 text-[#6366F1]" />
            <h2 className="font-display text-lg font-bold text-[#F4F4F5]">
              Your Anime DNA
            </h2>
          </div>
          <p className="text-xs text-[#71717A] mt-0.5">
            The genres, themes and patterns that define your taste.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20 px-3 py-1.5 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#6366F1]" />
            <span className="font-display text-sm font-bold text-[#6366F1]">
              {tasteScore} TASTE SCORE
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Segment DNA Bar */}
      <div className="space-y-2">
        <div className="h-3.5 w-full rounded-full bg-[#09090B] overflow-hidden flex p-0.5 border border-[#1F1F22]">
          {dna.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color || '#6366F1',
              }}
              className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 hover:opacity-85"
              title={`${item.genre}: ${item.percentage}%`}
            />
          ))}
        </div>
      </div>

      {/* Genre Percentage Breakdown List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {dna.map((item, idx) => (
          <div
            key={idx}
            className="obsidian-card p-3 flex flex-col justify-between hover:border-[#3F3F46] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color || '#6366F1' }}
                />
                <span className="text-xs font-medium text-[#F4F4F5] truncate">{item.genre}</span>
              </div>
              <span className="font-display text-xs font-bold text-[#F4F4F5]">{item.percentage}%</span>
            </div>
            <div className="text-[10px] text-[#71717A] flex items-center justify-between mt-2 pt-1.5 border-t border-[#1F1F22]">
              <span>{item.count} titles</span>
              {item.weightedScore > 0 && (
                <span className="text-[#F4B860] font-semibold">{item.weightedScore} avg</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Personalized Insight Box */}
      <div className="rounded-lg border border-[#27272A] bg-[#09090B] p-3.5 text-xs text-[#A1A1AA] flex items-start gap-2.5">
        <Sparkles className="h-4 w-4 text-[#6366F1] shrink-0 mt-0.5" />
        <p className="leading-relaxed font-sans">{insightQuote}</p>
      </div>
    </div>
  );
}
