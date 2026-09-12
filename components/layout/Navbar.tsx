'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RefreshCw, LogOut, Search, Menu, User as UserIcon, ExternalLink } from 'lucide-react';
import { MobileNav } from './MobileNav';

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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#27272A] bg-[#09090B]/90 backdrop-blur-md">
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile Menu & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="p-1.5 rounded-lg border border-[#27272A] bg-[#141417] text-[#A1A1AA] hover:text-[#F4F4F5] md:hidden"
              aria-label="Open Mobile Menu"
            >
              <Menu className="h-4 w-4" />
            </button>

            <Link href="/dashboard" className="flex items-center gap-2 group">
              <span className="text-[#6366F1] font-bold text-xl leading-none">◈</span>
              <span className="font-display text-lg font-bold tracking-tight text-[#F4F4F5]">
                Anime<span className="text-[#6366F1]">OS</span>
              </span>
            </Link>

            {user?.isDemo && (
              <span className="rounded-md bg-[#F4B860]/10 px-2 py-0.5 text-[10px] font-semibold text-[#F4B860] border border-[#F4B860]/20">
                Demo Mode
              </span>
            )}
          </div>

          {/* Search Bar Input (Mockup / Global Action) */}
          <div className="hidden sm:flex items-center max-w-xs w-full mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#71717A]" />
              <input
                type="text"
                readOnly
                placeholder="Search..."
                onClick={() => {
                  if (typeof window !== 'undefined' && window.location.pathname !== '/library') {
                    window.location.href = '/library';
                  }
                }}
                className="w-full rounded-lg border border-[#27272A] bg-[#0F0F12] pl-8 pr-8 py-1.5 text-xs text-[#F4F4F5] placeholder-[#71717A] cursor-pointer hover:border-[#3F3F46] focus:outline-none transition-colors"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-[#27272A] bg-[#141417] px-1.5 py-0.5 text-[9px] font-medium text-[#71717A]">
                ⌘K
              </span>
            </div>
          </div>

          {/* Actions & User Profile */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {onSync && (
                  <button
                    onClick={onSync}
                    disabled={isSyncing}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#141417] px-3 py-1.5 text-xs font-medium text-[#F4F4F5] hover:bg-[#18181C] hover:border-[#3F3F46] transition-all disabled:opacity-50"
                    title="Resync AniList Library"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin text-[#6366F1]' : 'text-[#71717A]'}`} />
                    <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                  </button>
                )}

                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center gap-2 rounded-full border border-[#27272A] bg-[#141417] px-2.5 py-1 transition-colors hover:border-[#6366F1]"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6366F1]/20 text-[#6366F1] font-semibold text-xs">
                        {user.username[0]?.toUpperCase() || <UserIcon className="h-3.5 w-3.5" />}
                      </div>
                    )}
                    <span className="hidden text-xs font-medium text-[#F4F4F5] sm:inline-block">
                      {user.username}
                    </span>
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#27272A] bg-[#0F0F12] p-1.5 shadow-2xl z-50">
                      <div className="px-3 py-2 border-b border-[#1F1F22] text-xs">
                        <p className="font-semibold text-[#F4F4F5] truncate">{user.username}</p>
                        <p className="text-[#71717A] text-[10px]">AniList Connected</p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setShowMenu(false)}
                        className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-[#A1A1AA] hover:bg-[#141417] hover:text-[#F4F4F5] transition-colors"
                      >
                        <UserIcon className="h-3.5 w-3.5" />
                        View Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
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
                className="inline-flex items-center gap-2 rounded-lg bg-[#6366F1] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-[#4F46E5] transition-all"
              >
                Connect AniList
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        user={user}
        onSync={onSync}
        isSyncing={isSyncing}
      />
    </>
  );
}
