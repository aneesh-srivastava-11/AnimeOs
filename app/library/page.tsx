'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { LibraryView } from '@/components/library/LibraryView';
import { SyncedUserAnime } from '@/types/analytics';

interface LibraryResponse {
  user: {
    username: string;
    avatar?: string;
    isDemo?: boolean;
  };
  library: SyncedUserAnime[];
}

export default function LibraryPage() {
  const [data, setData] = useState<LibraryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchLibrary = async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load library:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrary();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await fetch('/api/sync', { method: 'POST' });
      await fetchLibrary();
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

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Anime Library
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Inspect, search, and sort your synchronized AniList collection.
            </p>
          </div>

          {loading ? (
            <div className="h-96 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse" />
          ) : data?.library ? (
            <LibraryView library={data.library} />
          ) : (
            <div className="glass-panel rounded-2xl p-8 text-center border border-slate-800">
              <p className="text-sm text-slate-300">Unable to load library.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
