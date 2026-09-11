'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Dna, BarChart3, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Anime<span className="text-indigo-400">OS</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/api/auth/demo"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Try Demo Mode
            </Link>
            <Link
              href="/api/auth/login"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 transition-all hover:scale-105"
            >
              Connect AniList
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>AniList data. Next-generation intelligence.</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Your Personal <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-pink-400 bg-clip-text text-transparent">
              Anime Analytics System
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Connect your AniList account to instantly analyze your library, discover your deterministic
            <strong className="text-slate-200 font-semibold"> Anime DNA</strong> profile, explore empirical watch statistics, and receive recommendations that explain <em>why</em> they match your taste.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/api/auth/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all hover:scale-105"
            >
              <span>Connect AniList Account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/api/auth/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-all"
            >
              <span>Explore Demo Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel glass-panel-hover rounded-3xl p-8 border border-slate-800/80 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
                <Dna className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Anime DNA</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Determines your taste profile using weighted genre breakdowns, score distributions, and completion behavior.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60 text-xs font-semibold text-indigo-400">
              Deterministic & Data-Backed →
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-3xl p-8 border border-slate-800/80 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-6">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Visual Analytics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interactive Recharts visualizations for score distributions, total episodes/hours watched, and completion rates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60 text-xs font-semibold text-violet-400">
              Recharts Driven →
            </div>
          </div>

          <div className="glass-panel glass-panel-hover rounded-3xl p-8 border border-slate-800/80 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-6">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">Smart Recommendations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Find your next favorite show with clear explanations on why it matches your highest-rated characteristics.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60 text-xs font-semibold text-pink-400">
              Human-Readable Explanations →
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AnimeOS. Powered by AniList GraphQL API.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              OAuth 2.0 Secure
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
