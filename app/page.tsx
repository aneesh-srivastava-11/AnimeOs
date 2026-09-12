'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Dna, BarChart2, Compass, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] flex flex-col justify-between selection:bg-[#6366F1]/30 selection:text-white">
      {/* Top Navigation */}
      <header className="w-full border-b border-[#27272A] bg-[#09090B]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-[#6366F1] font-bold text-xl leading-none">◈</span>
            <span className="font-display text-lg font-bold tracking-tight text-[#F4F4F5]">
              Anime<span className="text-[#6366F1]">OS</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/api/auth/demo"
              className="px-3 py-1.5 text-xs font-medium text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
            >
              Try Demo
            </Link>
            <Link
              href="/api/auth/login"
              className="rounded-lg bg-[#6366F1] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-[#4F46E5] transition-all"
            >
              Connect AniList
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero & Preview Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20 w-full flex-1">
        {/* Hero Copy */}
        <div className="text-center space-y-6 max-w-4xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#141417] px-3.5 py-1 text-xs font-medium text-[#A1A1AA]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1]" />
            <span>Linear × Spotify Wrapped × Anime Analytics</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-[#F4F4F5] uppercase leading-[0.95] text-balance">
            YOUR ANIME.<br />
            YOUR TASTE.<br />
            <span className="text-[#6366F1]">UNDERSTOOD.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-xl mx-auto font-sans">
            AnimeOS turns your AniList history into a personalized picture of your anime taste.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/api/auth/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#6366F1] px-6 py-3 text-xs font-semibold text-white shadow-lg hover:bg-[#4F46E5] transition-all"
            >
              <span>Connect AniList</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/api/auth/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[#27272A] bg-[#141417] px-6 py-3 text-xs font-semibold text-[#F4F4F5] hover:bg-[#18181C] transition-all"
            >
              <span>Explore Demo Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Dark Dashboard Preview Mockup with Indigo Radial Backlight */}
        <div className="relative max-w-5xl mx-auto pt-8">
          {/* Subtle Radial Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#6366F1]/10 blur-[100px] pointer-events-none rounded-full" />

          {/* Browser Frame */}
          <div className="relative obsidian-card-elevated border border-[#27272A] rounded-2xl overflow-hidden shadow-2xl">
            {/* Window Controls Header */}
            <div className="h-10 border-b border-[#1F1F22] bg-[#09090B] px-4 flex items-center justify-between text-xs text-[#71717A]">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#27272A]" />
                <span className="h-3 w-3 rounded-full bg-[#27272A]" />
                <span className="h-3 w-3 rounded-full bg-[#27272A]" />
              </div>
              <span className="font-mono text-[11px] text-[#71717A]">animeos.app/dashboard</span>
              <div className="w-12" />
            </div>

            {/* Mock Dashboard Preview Content */}
            <div className="p-6 sm:p-8 space-y-6 bg-[#0F0F12]">
              <div className="space-y-1">
                <p className="text-xs text-[#71717A]">Good evening, Aneesh.</p>
                <p className="font-display text-xl font-bold text-[#F4F4F5]">
                  Here's what your anime history says about you.
                </p>
              </div>

              {/* Stats Grid Preview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="obsidian-card p-4">
                  <p className="font-display text-3xl font-bold text-[#F4F4F5]">347</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A] mt-1">
                    ANIME WATCHED
                  </p>
                </div>
                <div className="obsidian-card p-4">
                  <p className="font-display text-3xl font-bold text-[#F4F4F5]">4,812</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A] mt-1">
                    EPISODES
                  </p>
                </div>
                <div className="obsidian-card p-4">
                  <p className="font-display text-3xl font-bold text-[#F4F4F5]">1,204h</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A] mt-1">
                    WATCH TIME
                  </p>
                </div>
                <div className="obsidian-card p-4">
                  <p className="font-display text-3xl font-bold text-[#F4B860]">8.4</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A] mt-1">
                    AVG SCORE
                  </p>
                </div>
              </div>

              {/* Anime DNA Preview Bar */}
              <div className="obsidian-card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Dna className="h-4 w-4 text-[#6366F1]" />
                    <span className="font-display text-xs font-bold uppercase text-[#F4F4F5]">
                      YOUR ANIME DNA
                    </span>
                  </div>
                  <span className="rounded bg-[#6366F1]/10 px-2 py-0.5 text-xs font-bold text-[#6366F1] border border-[#6366F1]/20">
                    87 TASTE SCORE
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-[#09090B] flex overflow-hidden p-0.5 border border-[#1F1F22]">
                  <div className="h-full bg-[#6366F1] w-[31%]" />
                  <div className="h-full bg-[#8B5CF6] w-[24%]" />
                  <div className="h-full bg-[#F59E0B] w-[19%]" />
                  <div className="h-full bg-[#10B981] w-[14%]" />
                  <div className="h-full bg-[#EC4899] w-[12%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="obsidian-card p-6 space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20">
              <Dna className="h-4 w-4" />
            </div>
            <h3 className="font-display text-sm font-semibold text-[#F4F4F5]">Deterministic Anime DNA</h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Computes genre weights, rating behaviors, and completion ratios straight from your AniList library.
            </p>
          </div>

          <div className="obsidian-card p-6 space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20">
              <BarChart2 className="h-4 w-4" />
            </div>
            <h3 className="font-display text-sm font-semibold text-[#F4F4F5]">Restrained Visual Analytics</h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Quiet Recharts visualizations for score distribution, status breakdown, and watching trends.
            </p>
          </div>

          <div className="obsidian-card p-6 space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20">
              <Compass className="h-4 w-4" />
            </div>
            <h3 className="font-display text-sm font-semibold text-[#F4F4F5]">Explainable Recommendations</h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Receive recommendation cards with precise match percentages and human-readable explanations.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#27272A] bg-[#09090B] py-6 text-center text-xs text-[#71717A]">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AnimeOS. Connected via AniList API.</p>
          <div className="flex items-center gap-2 text-[#A1A1AA]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#34D399]" />
            <span>OAuth 2.0 Secure</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
