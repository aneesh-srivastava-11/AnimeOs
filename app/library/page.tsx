'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { LibraryView } from '@/components/library/LibraryView';
import { CardSkeleton } from '@/components/ui/SkeletonLoaders';
import { SyncStatusModal, SyncState } from '@/components/ui/SyncStatusModal';
import { SyncedUserAnime } from '@/types/analytics';

export default function LibraryPage() {
  const [library, setLibrary] = useState<SyncedUserAnime[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string; avatar?: string; isDemo?: boolean } | null>(null);
  const [syncState, setSyncState] = useState<SyncState>('idle');
  const [syncError, setSyncError] = useState<string>('');

  const loadLibraryData = async () => {
    try {
      const [meRes, libRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/dashboard'),
      ]);

      if (meRes.ok) {
        const meData = await meRes.json();
        setUser(meData.user);
      }

      if (libRes.ok) {
        const libData = await libRes.json();
        setLibrary(libData.library || libData.userAnimes || libData.analytics?.userAnimes || []);
      }
    } catch (err) {
      console.error('Failed to load library:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLibraryData();
  }, []);

  const handleSync = async () => {
    setSyncState('syncing');
    setSyncError('');
    try {
      const res = await fetch('/api/sync', { method: 'POST' });
      if (!res.ok) {
        throw new Error('Failed to synchronize library from AniList');
      }
      await loadLibraryData();
      setSyncState('complete');
    } catch (err: any) {
      console.error('Sync failed:', err);
      setSyncError(err?.message || 'Something went wrong while updating your library.');
      setSyncState('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] flex flex-col selection:bg-[#6366F1]/30 selection:text-white">
      <Navbar user={user} onSync={handleSync} isSyncing={syncState === 'syncing'} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F5]">
              Your Library
            </h1>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
              Synchronized entries from your AniList account.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <LibraryView library={library} onRefresh={loadLibraryData} />
          )}
        </main>
      </div>

      <SyncStatusModal
        status={syncState}
        updatedCount={library.length}
        errorMessage={syncError}
        onClose={() => setSyncState('idle')}
        onRetry={handleSync}
      />
    </div>
  );
}
