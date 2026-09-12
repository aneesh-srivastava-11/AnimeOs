'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { SyncStatusModal, SyncState } from '@/components/ui/SyncStatusModal';
import { SafeImage } from '@/components/ui/SafeImage';
import { User, RefreshCw, Star, ShieldCheck, Film, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { ComputedUserAnalytics } from '@/types/analytics';

interface ProfileData {
  user: {
    username: string;
    avatar?: string;
    isDemo?: boolean;
    anilistId?: number;
  };
  analytics: ComputedUserAnalytics;
}

export default function ProfilePage() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncState, setSyncState] = useState<SyncState>('idle');
  const [syncError, setSyncError] = useState<string>('');

  const fetchProfileData = async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleSync = async () => {
    setSyncState('syncing');
    setSyncError('');
    try {
      const res = await fetch('/api/sync', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to synchronize with AniList');
      await fetchProfileData();
      setSyncState('complete');
    } catch (err: any) {
      console.error('Sync failed:', err);
      setSyncError(err?.message || 'Failed to update library.');
      setSyncState('error');
    }
  };

  const user = data?.user;
  const analytics = data?.analytics;

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] flex flex-col selection:bg-[#6366F1]/30 selection:text-white">
      <Navbar user={user} onSync={handleSync} isSyncing={syncState === 'syncing'} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 w-full">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F5]">
              Your Profile
            </h1>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
              AniList integration status, library stats, and account settings.
            </p>
          </div>

          {loading ? (
            <div className="obsidian-card-elevated p-8 animate-pulse h-64 rounded-xl" />
          ) : user ? (
            <div className="space-y-6 animate-fade-in">
              {/* Account Banner */}
              <div className="obsidian-card-elevated p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <SafeImage
                    src={user.avatar}
                    alt={user.username}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-[#27272A]"
                    fallbackLabel={user.username}
                  />

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-[#F4F4F5]">
                        {user.username}
                      </h2>
                      {user.isDemo && (
                        <span className="rounded bg-[#F4B860]/10 px-2 py-0.5 text-[10px] font-semibold text-[#F4B860] border border-[#F4B860]/20">
                          Demo Account
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#A1A1AA] flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#34D399]" />
                      Connected to AniList OAuth
                    </p>

                    <p className="text-[11px] text-[#71717A] flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Last sync: Today
                    </p>
                  </div>
                </div>

                {/* Primary Sync Button */}
                <button
                  onClick={handleSync}
                  disabled={syncState === 'syncing'}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#6366F1] px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#4F46E5] transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${syncState === 'syncing' ? 'animate-spin' : ''}`} />
                  <span>{syncState === 'syncing' ? 'Syncing Library...' : 'Sync Now'}</span>
                </button>
              </div>

              {/* Stats Overview */}
              {analytics && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="obsidian-card p-5 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                      TOTAL ANIME
                    </p>
                    <p className="font-display text-3xl font-bold text-[#F4F4F5]">
                      {analytics.totalWatched}
                    </p>
                  </div>

                  <div className="obsidian-card p-5 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                      EPISODES WATCHED
                    </p>
                    <p className="font-display text-3xl font-bold text-[#F4F4F5]">
                      {analytics.episodesWatched.toLocaleString()}
                    </p>
                  </div>

                  <div className="obsidian-card p-5 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                      AVERAGE RATING
                    </p>
                    <p className="font-display text-3xl font-bold text-[#F4B860]">
                      {analytics.meanScore > 0 ? analytics.meanScore.toFixed(1) : 'N/A'}
                    </p>
                  </div>

                  <div className="obsidian-card p-5 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                      COMPLETION RATE
                    </p>
                    <p className="font-display text-3xl font-bold text-[#34D399]">
                      {analytics.completionRate}%
                    </p>
                  </div>
                </div>
              )}

              {/* Account Details Box */}
              <div className="obsidian-card p-6 space-y-4">
                <h3 className="font-display text-sm font-semibold text-[#F4F4F5]">
                  Account Status & Configuration
                </h3>
                <div className="divide-y divide-[#1F1F22] text-xs">
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#A1A1AA]">Account Status</span>
                    <span className="flex items-center gap-1.5 text-[#34D399] font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Active & Synchronized
                    </span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#A1A1AA]">AniList Profile</span>
                    <a
                      href={`https://anilist.co/user/${user.username}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#6366F1] hover:underline inline-flex items-center gap-1"
                    >
                      <span>anilist.co/user/{user.username}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-[#A1A1AA]">Theme</span>
                    <span className="text-[#F4F4F5] font-medium">Obsidian Anime (Dark)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>

      <SyncStatusModal
        status={syncState}
        updatedCount={analytics?.totalWatched || 0}
        errorMessage={syncError}
        onClose={() => setSyncState('idle')}
        onRetry={handleSync}
      />
    </div>
  );
}
