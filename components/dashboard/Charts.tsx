'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import { AnimeDNAGenre, ScoreDistributionItem, WatchStatusBreakdown } from '@/types/analytics';

interface ChartsProps {
  genreStats: AnimeDNAGenre[];
  scoreStats: ScoreDistributionItem[];
  watchStats: WatchStatusBreakdown;
}

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: '#34D399', // Muted Success Green
  CURRENT: '#6366F1',   // Electric Indigo
  PLANNING: '#F4B860',  // Warm Amber
  PAUSED: '#A1A1AA',    // Muted Secondary
  DROPPED: '#F87171',   // Muted Error Red
  REPEATING: '#8B5CF6',
};

export function Charts({ genreStats, scoreStats, watchStats }: ChartsProps) {
  const statusData = Object.keys(watchStats)
    .map((key) => ({
      name: key,
      value: watchStats[key as keyof WatchStatusBreakdown] || 0,
      color: STATUS_COLORS[key] || '#52525B',
    }))
    .filter((item) => item.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Score Distribution Histogram */}
      <div className="obsidian-card p-6 space-y-4">
        <div>
          <h3 className="font-display text-sm font-semibold text-[#F4F4F5]">
            Score Distribution
          </h3>
          <p className="text-xs text-[#71717A]">Rating frequency from 1 to 10</p>
        </div>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreStats} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid stroke="#1F1F22" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="score" stroke="#52525B" fontSize={11} tickLine={false} />
              <YAxis stroke="#52525B" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F0F12',
                  borderColor: '#27272A',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#F4F4F5',
                }}
                cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }}
              />
              <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Library Status Breakdown */}
      <div className="obsidian-card p-6 space-y-4">
        <div>
          <h3 className="font-display text-sm font-semibold text-[#F4F4F5]">
            Library Status Breakdown
          </h3>
          <p className="text-xs text-[#71717A]">Distribution of watched, dropped, and planned anime</p>
        </div>

        <div className="h-48 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#141417" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F0F12',
                  borderColor: '#27272A',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#F4F4F5',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 border-t border-[#1F1F22]">
          {statusData.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[#A1A1AA] font-medium">{item.name}</span>
              <span className="text-[#71717A]">({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
