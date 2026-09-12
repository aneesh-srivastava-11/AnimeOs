'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Library, Compass, User, Sparkles } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const overviewNav = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/library', label: 'Library', icon: Library },
    { href: '/recommendations', label: 'Recommendations', icon: Compass },
  ];

  const profileNav = [
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-56 border-r border-[#27272A] bg-[#09090B] min-h-[calc(100vh-4rem)] p-4 space-y-6 shrink-0">
      {/* Main Navigation */}
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-[#71717A] mb-1.5">
          Overview
        </p>
        {overviewNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
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

      {/* Account Section */}
      <div className="space-y-1 pt-2 border-t border-[#1F1F22]">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-[#71717A] mb-1.5">
          Your Profile
        </p>
        {profileNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
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

      {/* Footer Taste Indicator */}
      <div className="mt-auto rounded-xl border border-[#27272A] bg-[#0F0F12] p-3.5 space-y-1">
        <div className="flex items-center gap-1.5 text-[#6366F1]">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-[11px] font-semibold tracking-wide uppercase text-[#F4F4F5]">Taste Active</span>
        </div>
        <p className="text-[11px] text-[#71717A] leading-relaxed">
          Synced live with your AniList history.
        </p>
      </div>
    </aside>
  );
}
