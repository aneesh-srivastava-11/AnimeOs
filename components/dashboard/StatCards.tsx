'use client';

import React from 'react';
import { ComputedUserAnalytics } from '@/types/analytics';

interface StatCardsProps {
  analytics: ComputedUserAnalytics;
}

export function StatCards({ analytics }: StatCardsProps) {
  const stats = [
    {
      title: 'ANIME WATCHED',
      value: analytics.totalWatched.toLocaleString(),
      subtext: `${analytics.watchStats.CURRENT || 0} currently watching`,
      highlight: false,
    },
    {
      title: 'EPISODES',
      value: analytics.episodesWatched.toLocaleString(),
      subtext: `~${analytics.hoursWatched} total hours`,
      highlight: false,
    },
    {
      title: 'WATCH TIME',
      value: `${analytics.hoursWatched}h`,
      subtext: `${analytics.completionRate}% completion rate`,
      highlight: false,
    },
    {
      title: 'AVG SCORE',
      value: analytics.meanScore > 0 ? analytics.meanScore.toFixed(1) : 'N/A',
      subtext: 'Across scored titles',
      highlight: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="obsidian-card p-5 space-y-2 obsidian-card-hover">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
            {stat.title}
          </p>
          <div
            className={`font-display text-4xl sm:text-5xl font-bold tracking-tight ${
              stat.highlight ? 'text-[#F4B860]' : 'text-[#F4F4F5]'
            }`}
          >
            {stat.value}
          </div>
          <p className="text-xs text-[#A1A1AA]">{stat.subtext}</p>
        </div>
      ))}
    </div>
  );
}
