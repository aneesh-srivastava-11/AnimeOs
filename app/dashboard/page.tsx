'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatCards } from '@/components/dashboard/StatCards';
import { AnimeDNACard } from '@/components/dashboard/AnimeDNACard';
import { CharacterMatchCard } from '@/components/dashboard/CharacterMatchCard';
import { ArchetypeCard } from '@/components/dashboard/ArchetypeCard';
import { YouVsAnilistCard } from '@/components/dashboard/YouVsAnilistCard';
import { HotTakesCard } from '@/components/dashboard/HotTakesCard';
import { AnimeAwardsCard } from '@/components/dashboard/AnimeAwardsCard';
import { Charts } from '@/components/dashboard/Charts';
import { InsightsCard } from '@/components/dashboard/InsightsCard';
import { DashboardSkeleton } from '@/components/ui/SkeletonLoaders';
import { SyncStatusModal, SyncState } from '@/components/ui/SyncStatusModal';
import { ShareableCardModal } from '@/components/ui/ShareableCardModal';
import { ComputedUserAnalytics } from '@/types/analytics';
import { Share2 } from 'lucide-react';

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
  const [syncState, setSyncState] = useState<SyncState>('idle');
  const [syncError, setSyncError] = useState<string>('');
  const [shareModalOpen, setShareModalOpen] = useState(false);

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
    setSyncState('syncing');
    setSyncError('');
    try {
      const res = await fetch('/api/sync', { method: 'POST' });
      if (!res.ok) {
        throw new Error('Failed to update library from AniList');
      }
      await fetchDashboard();
      setSyncState('complete');
    } catch (err: any) {
      console.error('Sync failed:', err);
      setSyncError(err?.message || 'Something went wrong while updating your library.');
      setSyncState('error');
    }
  };

  const username = data?.user?.username || 'Viewer';

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] flex flex-col selection:bg-[#6366F1]/30 selection:text-white">
      <Navbar user={data?.user} onSync={handleSync} isSyncing={syncState === 'syncing'} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F5]">
                Good evening, {username}.
              </h1>
              <p className="text-xs sm:text-sm text-[#A1A1AA]">
                Here's what your anime history says about you.
              </p>
            </div>

            {data?.analytics && (
              <button
                onClick={() => setShareModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#27272A] bg-[#141417] px-4 py-2 text-xs font-semibold text-[#F4F4F5] hover:border-[#6366F1] hover:text-[#6366F1] transition-all shadow-md"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Taste Card</span>
              </button>
            )}
          </div>

          {loading ? (
            <DashboardSkeleton />
          ) : data?.analytics ? (
            <div className="space-y-8 animate-fade-in">
              {/* Stat Cards */}
              <StatCards analytics={data.analytics} />

              {/* Headline Feature 1: Anime Character Persona Match */}
              <CharacterMatchCard match={data.analytics.characterMatch} />

              {/* Headline Feature 2: Primary & Secondary Archetypes */}
              <ArchetypeCard archetype={data.analytics.archetype} />

              {/* Anime DNA Centerpiece */}
              <AnimeDNACard dna={data.analytics.animeDNA} />

              {/* Headline Feature 3: You vs AniList Community */}
              <YouVsAnilistCard benchmark={data.analytics.communityBenchmark} />

              {/* Hot Takes & Personal Awards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HotTakesCard hotTakes={data.analytics.hotTakes} />
                <AnimeAwardsCard awards={data.analytics.awards} />
              </div>

              {/* Visual Analytics */}
              <Charts
                genreStats={data.analytics.genreStats}
                scoreStats={data.analytics.scoreStats}
                watchStats={data.analytics.watchStats}
              />

              {/* Empirical Insights */}
              <InsightsCard insights={data.analytics.insights} />
            </div>
          ) : (
            <div className="obsidian-card p-12 text-center max-w-md mx-auto space-y-4 my-12">
              <p className="text-sm text-[#A1A1AA]">Unable to load dashboard analytics.</p>
              <button
                onClick={fetchDashboard}
                className="rounded-lg bg-[#6366F1] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4F46E5] transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Sync Status Floating Notification */}
      <SyncStatusModal
        status={syncState}
        updatedCount={data?.analytics?.totalWatched || 0}
        errorMessage={syncError}
        onClose={() => setSyncState('idle')}
        onRetry={handleSync}
      />

      {/* Shareable Card Modal */}
      <ShareableCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        analytics={data?.analytics}
        username={username}
      />
    </div>
  );
}

