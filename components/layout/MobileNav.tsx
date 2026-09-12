'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Library, Compass, User, X, Sparkles, RefreshCw } from 'lucide-react';
import { SafeImage } from '@/components/ui/SafeImage';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    username: string;
    avatar?: string;
    isDemo?: boolean;
  } | null;
  onSync?: () => void;
  isSyncing?: boolean;
}

export function MobileNav({ isOpen, onClose, user, onSync, isSyncing }: MobileNavProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/library', label: 'Library', icon: Library },
    { href: '/recommendations', label: 'Recommendations', icon: Compass },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative z-10 w-4/5 max-w-xs bg-[#09090B] border-r border-[#27272A] p-5 flex flex-col justify-between h-full shadow-2xl animate-fade-in">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1F1F22]">
            <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2">
              <span className="text-[#6366F1] font-bold text-lg">◈</span>
              <span className="font-display text-lg font-bold tracking-tight text-[#F4F4F5]">
                ANIMEOS
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#71717A] hover:text-[#F4F4F5] hover:bg-[#18181C]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav Items */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-[#71717A] mb-2">
              Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#6366F1]/10 text-[#F4F4F5] border-l-2 border-[#6366F1]'
                      : 'text-[#A1A1AA] hover:bg-[#141417] hover:text-[#F4F4F5]'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#6366F1]' : 'text-[#71717A]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* User / Sync Footer */}
        <div className="pt-4 border-t border-[#1F1F22] space-y-3">
          {user && onSync && (
            <button
              onClick={() => {
                onSync();
                onClose();
              }}
              disabled={isSyncing}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#27272A] bg-[#141417] py-2 text-xs font-medium text-[#F4F4F5] hover:bg-[#18181C] disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin text-[#6366F1]' : ''}`} />
              <span>{isSyncing ? 'Syncing Library...' : 'Sync AniList'}</span>
            </button>
          )}

          {user && (
            <div className="flex items-center gap-3 px-2 py-1.5">
              {user.avatar ? (
                <SafeImage src={user.avatar} alt={user.username} className="h-8 w-8 rounded-full object-cover border border-[#27272A]" fallbackLabel={user.username} />
              ) : (
                <div className="h-8 w-8 rounded-full bg-[#18181C] border border-[#27272A] flex items-center justify-center text-xs font-semibold text-[#6366F1]">
                  {user.username[0]?.toUpperCase()}
                </div>
              )}
              <div className="truncate">
                <p className="text-xs font-medium text-[#F4F4F5] truncate">{user.username}</p>
                <p className="text-[10px] text-[#71717A]">Connected</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
