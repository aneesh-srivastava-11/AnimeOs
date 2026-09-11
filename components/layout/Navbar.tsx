'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RefreshCw, LogOut, Sparkles, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  user?: {
    username: string;
    avatar?: string;
    isDemo?: boolean;
  } | null;
  onSync?: () => void;
  isSyncing?: boolean;
}

export function Navbar({ user, onSync, isSyncing }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Anime<span className="text-indigo-400">OS</span>
            </span>
          </Link>
          {user?.isDemo && (
            <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400 border border-amber-500/20">
              Demo Mode
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {onSync && (
                <button
                  onClick={onSync}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-200 transition-all hover:bg-slate-700/60 hover:text-white disabled:opacity-50"
                  title="Resync AniList Library"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin text-indigo-400' : ''}`} />
                  <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Resync'}</span>
                </button>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 rounded-full border border-slate-700/60 p-1 transition-colors hover:border-indigo-500/50"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600/30 text-indigo-300">
                      <UserIcon className="h-4 w-4" />
                    </div>
                  )}
                  <span className="hidden pr-2 text-xs font-medium text-slate-200 sm:inline-block">
                    {user.username}
                  </span>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-800 bg-slate-900/95 p-1.5 shadow-2xl backdrop-blur-xl">
                    <div className="px-3 py-2 border-b border-slate-800 text-xs">
                      <p className="font-semibold text-slate-200">{user.username}</p>
                      <p className="text-slate-400 text-[10px]">AniList Connected</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Disconnect Account
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/api/auth/login"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all hover:scale-105"
            >
              Connect AniList
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
