'use client';

import React, { useState } from 'react';
import { Search, Star, ExternalLink, Filter, ArrowUpDown } from 'lucide-react';
import { SyncedUserAnime } from '@/types/analytics';

interface LibraryViewProps {
  library: SyncedUserAnime[];
}

export function LibraryView({ library }: LibraryViewProps) {
  const [activeStatus, setActiveStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'score' | 'title' | 'progress'>('score');

  const statuses = ['ALL', 'COMPLETED', 'CURRENT', 'PLANNING', 'DROPPED', 'PAUSED'];

  const filtered = library.filter((item) => {
    const matchesStatus = activeStatus === 'ALL' || item.status === activeStatus;
    const matchesQuery =
      searchQuery === '' ||
      item.anime.titleRomaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.anime.titleEnglish && item.anime.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesQuery;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'progress') return b.progress - a.progress;
    return a.anime.titleRomaji.localeCompare(b.anime.titleRomaji);
  });

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setActiveStatus(st)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                activeStatus === st
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search anime title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'score' | 'title' | 'progress')}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="score" className="bg-slate-900">Sort by Score</option>
              <option value="title" className="bg-slate-900">Sort by Title</option>
              <option value="progress" className="bg-slate-900">Sort by Progress</option>
            </select>
          </div>
        </div>
      </div>

      {/* Anime Cards Grid */}
      {filtered.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-slate-800">
          <Filter className="mx-auto h-8 w-8 text-slate-600 mb-2" />
          <h3 className="text-sm font-semibold text-slate-300">No Anime Found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/60 flex flex-col justify-between"
            >
              {/* Cover Image & Score Badge */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
                {item.anime.coverImage ? (
                  <img
                    src={item.anime.coverImage}
                    alt={item.anime.titleRomaji}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-600 text-xs">
                    No Cover
                  </div>
                )}
                {item.score > 0 && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-slate-950/80 backdrop-blur-md px-2 py-0.5 border border-amber-500/30 text-amber-400 text-[10px] font-bold shadow-lg">
                    <Star className="h-3 w-3 fill-amber-400" />
                    <span>{item.score}</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2">
                  <span className="rounded-md bg-slate-950/80 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-semibold text-slate-300 border border-slate-800">
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Card Meta Info */}
              <div className="p-3 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                    {item.anime.titleRomaji}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {item.anime.genres.slice(0, 2).map((g) => g.genre.name).join(' • ')}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span>
                    Ep {item.progress} / {item.anime.episodes || '?'}
                  </span>
                  <a
                    href={`https://anilist.co/anime/${item.anime.anilistId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-indigo-400 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
