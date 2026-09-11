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
  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-900/60 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-indigo-400" />
        <h2 className="font-display text-base font-bold text-white uppercase tracking-wider">
          Empirical Taste Insights
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight) => {
          const Icon = ICON_MAP[insight.icon as keyof typeof ICON_MAP] || Sparkles;
          return (
            <div
              key={insight.id}
              className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-4 flex gap-3.5 items-start hover:border-slate-700/80 transition-colors"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mt-0.5">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-200 mb-1">{insight.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
