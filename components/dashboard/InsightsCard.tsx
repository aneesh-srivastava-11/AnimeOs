'use client';

import React from 'react';
import { Flame, Star, CheckCircle2, ShieldCheck, Clock, Sparkles, XCircle } from 'lucide-react';
import { NaturalLanguageInsight } from '@/types/analytics';

interface InsightsCardProps {
  insights: NaturalLanguageInsight[];
}

const ICON_MAP = {
  Flame,
  Star,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  XCircle,
};

export function InsightsCard({ insights }: InsightsCardProps) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="obsidian-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#6366F1]" />
        <h2 className="font-display text-sm font-semibold text-[#F4F4F5] uppercase tracking-wider">
          Empirical Insights
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {insights.map((insight) => {
          const Icon = ICON_MAP[insight.icon as keyof typeof ICON_MAP] || Sparkles;
          return (
            <div
              key={insight.id}
              className="rounded-lg border border-[#27272A] bg-[#09090B] p-3.5 flex gap-3 items-start hover:border-[#3F3F46] transition-colors"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 mt-0.5">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-semibold text-[#F4F4F5]">{insight.title}</h3>
                <p className="text-xs text-[#71717A] leading-relaxed font-sans">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
