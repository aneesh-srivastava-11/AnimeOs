'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Library, Compass, Sparkles } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/library', label: 'Library', icon: Library },
    { href: '/recommendations', label: 'Recommendations', icon: Compass },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-slate-800/80 bg-slate-950/50 min-h-[calc(100vh-4rem)] p-4 space-y-6">
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Analytics Engine
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto rounded-2xl border border-indigo-500/10 bg-indigo-950/20 p-4">
        <div className="flex items-center gap-2 text-indigo-400 mb-1">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold">Anime DNA Active</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Your taste metrics update automatically whenever you complete or score anime on AniList.
        </p>
      </div>
    </aside>
  );
}
