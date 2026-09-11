'use client';

import React from 'react';
import { Dna, Sparkles } from 'lucide-react';
import { AnimeDNAGenre } from '@/types/analytics';

interface AnimeDNACardProps {
  dna: AnimeDNAGenre[];
}

export function AnimeDNACard({ dna }: AnimeDNACardProps) {
  if (!dna || dna.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 text-center py-10">
        <Dna className="mx-auto h-8 w-8 text-indigo-400 mb-2 animate-pulse" />
        <h3 className="text-sm font-semibold text-slate-200">Analyzing Your Anime DNA</h3>
        <p className="text-xs text-slate-400 mt-1">
          Complete and rate more anime on AniList to generate your taste profile.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-900/60 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Dna className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              YOUR ANIME DNA
              <Sparkles className="h-4 w-4 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400">
              Taste profile computed from genre frequency, ratings, and completion behavior
            </p>
          </div>
        </div>
      </div>

      {/* Multi-Segment DNA Bar */}
      <div className="h-4 w-full rounded-full bg-slate-950 overflow-hidden flex p-0.5 border border-slate-800 mb-6">
        {dna.map((item, idx) => (
          <div
            key={idx}
            style={{
              width: `${item.percentage}%`,
              backgroundColor: item.color,
            }}
            className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 hover:opacity-90 cursor-pointer"
            title={`${item.genre}: ${item.percentage}%`}
          />
        ))}
      </div>

      {/* Breakdown List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {dna.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-3.5 flex flex-col justify-between hover:border-slate-700/80 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-slate-200">{item.genre}</span>
              </div>
              <span className="font-display text-sm font-bold text-white">{item.percentage}%</span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center justify-between mt-1 pt-1.5 border-t border-slate-800/40">
              <span>{item.count} titles</span>
              {item.weightedScore > 0 && (
                <span className="text-amber-400 font-medium">{item.weightedScore} avg</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
