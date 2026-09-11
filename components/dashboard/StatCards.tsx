'use client';

import React from 'react';
import { Film, Clock, Star, CheckCircle, Flame } from 'lucide-react';
import { ComputedUserAnalytics } from '@/types/analytics';

interface StatCardsProps {
  analytics: ComputedUserAnalytics;
}

export function StatCards({ analytics }: StatCardsProps) {
  const stats = [
    {
      title: 'Anime Completed',
      value: analytics.totalWatched.toString(),
      subtext: `${analytics.watchStats.CURRENT} currently watching`,
      icon: Film,
      color: 'from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/20',
    },
    {
      title: 'Episodes Watched',
      value: analytics.episodesWatched.toLocaleString(),
      subtext: `~${analytics.hoursWatched} total hours`,
      icon: Clock,
      color: 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20',
    },
    {
      title: 'Average Score',
      value: analytics.meanScore > 0 ? `${analytics.meanScore} / 10` : 'N/A',
      subtext: 'Across scored anime',
      icon: Star,
      color: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/20',
    },
    {
      title: 'Completion Rate',
      value: `${analytics.completionRate}%`,
      subtext: `${analytics.watchStats.DROPPED} shows dropped`,
      icon: CheckCircle,
      color: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`glass-panel glass-panel-hover rounded-2xl p-5 border bg-gradient-to-br ${stat.color}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.title}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900/60">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="font-display text-2xl font-bold tracking-tight text-white mb-1">
              {stat.value}
            </div>
            <p className="text-[11px] text-slate-400">{stat.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
