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
} from 'recharts';
import { AnimeDNAGenre, ScoreDistributionItem, WatchStatusBreakdown } from '@/types/analytics';

interface ChartsProps {
  genreStats: AnimeDNAGenre[];
  scoreStats: ScoreDistributionItem[];
  watchStats: WatchStatusBreakdown;
}

const STATUS_COLORS = {
  COMPLETED: '#10B981',
  CURRENT: '#3B82F6',
  PLANNING: '#F59E0B',
  PAUSED: '#8B5CF6',
  DROPPED: '#EF4444',
  REPEATING: '#EC4899',
};

export function Charts({ genreStats, scoreStats, watchStats }: ChartsProps) {
  const statusData = Object.keys(watchStats)
    .map((key) => ({
      name: key,
      value: watchStats[key as keyof WatchStatusBreakdown] || 0,
      color: STATUS_COLORS[key as keyof typeof STATUS_COLORS] || '#64748B',
    }))
    .filter((item) => item.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Score Distribution Histogram */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-900/60 shadow-xl">
        <h3 className="font-display text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
          Score Distribution (1–10)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="score" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#F8FAFC',
                }}
                cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
              />
              <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Watch Status Distribution */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-900/60 shadow-xl">
        <h3 className="font-display text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
          Library Status Breakdown
        </h3>
        <div className="h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#F8FAFC',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          {statusData.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-300 font-medium">{item.name}</span>
              <span className="text-slate-500">({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
