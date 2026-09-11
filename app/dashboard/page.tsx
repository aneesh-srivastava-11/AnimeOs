'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatCards } from '@/components/dashboard/StatCards';
import { AnimeDNACard } from '@/components/dashboard/AnimeDNACard';
import { Charts } from '@/components/dashboard/Charts';
import { InsightsCard } from '@/components/dashboard/InsightsCard';
import { ComputedUserAnalytics } from '@/types/analytics';

interface DashboardResponse {
  user: {
    username: string;
    avatar?: string;
    isDemo?: boolean;
  };
  analytics: ComputedUserAnalytics;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await fetch('/api/sync', { method: 'POST' });
      await fetchDashboard();
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col">
      <Navbar user={data?.user} onSync={handleSync} isSyncing={syncing} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 w-full">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Analytics Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Personalized taste profile and library insights synchronized with AniList.
            </p>
          </div>

          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-28 rounded-2xl bg-slate-900/60 border border-slate-800" />
              <div className="h-44 rounded-2xl bg-slate-900/60 border border-slate-800" />
              <div className="h-72 rounded-2xl bg-slate-900/60 border border-slate-800" />
            </div>
          ) : data?.analytics ? (
            <>
              {/* Stat Cards */}
              <StatCards analytics={data.analytics} />

              {/* Anime DNA Profile */}
              <AnimeDNACard dna={data.analytics.animeDNA} />

              {/* Visualizations */}
              <Charts
                genreStats={data.analytics.genreStats}
                scoreStats={data.analytics.scoreStats}
                watchStats={data.analytics.watchStats}
              />

              {/* Empirical Insights */}
              <InsightsCard insights={data.analytics.insights} />
            </>
          ) : (
            <div className="glass-panel rounded-2xl p-8 text-center border border-slate-800">
              <p className="text-sm text-slate-300">Unable to load dashboard analytics.</p>
              <button
                onClick={fetchDashboard}
                className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
