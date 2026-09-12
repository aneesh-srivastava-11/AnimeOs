import React, { useState } from 'react';
import { Search, Star, ExternalLink, Filter, ArrowUpDown, Edit3, HelpCircle, Film, BookOpen, Tv, Share2 } from 'lucide-react';
import { AnimeExplanation, SyncedUserAnime } from '@/types/analytics';
import { EmptyState } from '@/components/ui/EmptyState';
import { SafeImage } from '@/components/ui/SafeImage';
import { ShareableAnimeCardModal, AnimeShareData } from '@/components/ui/ShareableAnimeCardModal';
import { ExplainableModal } from './ExplainableModal';
import { QuickEditModal } from './QuickEditModal';
import { explainAnimeRating } from '@/lib/analytics/explainability';

interface LibraryViewProps {
  library: SyncedUserAnime[];
  onRefresh?: () => void;
}

export function LibraryView({ library, onRefresh }: LibraryViewProps) {
  const [activeStatus, setActiveStatus] = useState<string>('ALL');
  const [formatFilter, setFormatFilter] = useState<'ALL' | 'TV' | 'MOVIE' | 'MANGA'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'score' | 'title' | 'progress' | 'updated'>('score');

  // Modals state
  const [selectedAnimeForEdit, setSelectedAnimeForEdit] = useState<SyncedUserAnime | null>(null);
  const [selectedExplanation, setSelectedExplanation] = useState<AnimeExplanation | null>(null);
  const [selectedAnimeForShare, setSelectedAnimeForShare] = useState<AnimeShareData | null>(null);

  const statuses = ['ALL', 'CURRENT', 'COMPLETED', 'PLANNING', 'DROPPED', 'PAUSED'];

  const filtered = library.filter((item) => {
    const matchesStatus = activeStatus === 'ALL' || item.status === activeStatus;
    const matchesFormat =
      formatFilter === 'ALL' ||
      (formatFilter === 'MOVIE' && item.anime.format === 'MOVIE') ||
      (formatFilter === 'TV' && (item.anime.format === 'TV' || item.anime.format === 'TV_SHORT')) ||
      (formatFilter === 'MANGA' && (item.mediaType === 'MANGA' || item.anime.format === 'MANGA'));

    const matchesQuery =
      searchQuery === '' ||
      item.anime.titleRomaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.anime.titleEnglish && item.anime.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesFormat && matchesQuery;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'progress') return b.progress - a.progress;
    if (sortBy === 'updated') {
      const timeB = b.completedAt ? new Date(b.completedAt).getTime() : (b.startedAt ? new Date(b.startedAt).getTime() : 0);
      const timeA = a.completedAt ? new Date(a.completedAt).getTime() : (a.startedAt ? new Date(a.startedAt).getTime() : 0);
      return timeB - timeA;
    }
    return a.anime.titleRomaji.localeCompare(b.anime.titleRomaji);
  });

  const handleOpenExplanation = (item: SyncedUserAnime) => {
    const exp = explainAnimeRating(item.id, library);
    setSelectedExplanation(exp);
  };

  const handleShareCard = (item: SyncedUserAnime) => {
    const exp = explainAnimeRating(item.id, library);
    setSelectedAnimeForShare({
      id: item.id,
      titleRomaji: item.anime.titleRomaji,
      titleEnglish: item.anime.titleEnglish,
      coverImage: item.anime.coverImage,
      score: item.score,
      averageScore: item.anime.averageScore,
      status: item.status,
      episodes: item.anime.episodes,
      format: item.anime.format,
      genres: item.anime.genres.map((g) => g.genre.name),
      whyExplanation: exp.summary,
      anilistId: item.anime.anilistId,
    });
  };

  return (
    <div className="space-y-6">
      {/* Format & Status Controls Bar */}
      <div className="space-y-3 obsidian-card p-4">
        {/* Format Selector Tabs */}
        <div className="flex items-center justify-between border-b border-[#1F1F22] pb-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFormatFilter('ALL')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all ${
                formatFilter === 'ALL' ? 'bg-[#6366F1] text-white' : 'text-[#A1A1AA] hover:bg-[#141417]'
              }`}
            >
              <span>All Formats</span>
            </button>
            <button
              onClick={() => setFormatFilter('TV')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all ${
                formatFilter === 'TV' ? 'bg-[#6366F1] text-white' : 'text-[#A1A1AA] hover:bg-[#141417]'
              }`}
            >
              <Tv className="h-3.5 w-3.5" />
              <span>TV Series</span>
            </button>
            <button
              onClick={() => setFormatFilter('MOVIE')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all ${
                formatFilter === 'MOVIE' ? 'bg-[#6366F1] text-white' : 'text-[#A1A1AA] hover:bg-[#141417]'
              }`}
            >
              <Film className="h-3.5 w-3.5" />
              <span>Anime Movies</span>
            </button>
            <button
              onClick={() => setFormatFilter('MANGA')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold transition-all ${
                formatFilter === 'MANGA' ? 'bg-[#6366F1] text-white' : 'text-[#A1A1AA] hover:bg-[#141417]'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Manga</span>
            </button>
          </div>
        </div>

        {/* Status & Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setActiveStatus(st)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all shrink-0 ${
                  activeStatus === st
                    ? 'bg-[#18181C] text-[#F4F4F5] border border-[#3F3F46]'
                    : 'text-[#71717A] hover:bg-[#141417] hover:text-[#F4F4F5]'
                }`}
              >
                {st === 'CURRENT' ? 'Watching' : st}
              </button>
            ))}
          </div>

          {/* Search & Sort Input */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#71717A]" />
              <input
                type="text"
                placeholder="Search library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#27272A] bg-[#09090B] pl-8 pr-3 py-1.5 text-xs text-[#F4F4F5] placeholder-[#71717A] focus:border-[#6366F1] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-[#09090B] border border-[#27272A] rounded-lg px-2.5 py-1.5 text-xs text-[#F4F4F5]">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#71717A]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-[#F4F4F5] focus:outline-none cursor-pointer"
              >
                <option value="score" className="bg-[#0F0F12]">Sort by Score</option>
                <option value="title" className="bg-[#0F0F12]">Sort by Title</option>
                <option value="progress" className="bg-[#0F0F12]">Sort by Progress</option>
                <option value="updated" className="bg-[#0F0F12]">Recently Updated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Anime Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Entries Found"
          description="No entries matched your filter or search query."
          icon={Filter}
          actionLabel="Reset Filters"
          onAction={() => {
            setActiveStatus('ALL');
            setFormatFilter('ALL');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group obsidian-card overflow-hidden flex flex-col justify-between hover:scale-[1.02] hover:border-[#3F3F46] transition-all duration-200 relative"
            >
              {/* Cover Image & Quick Action Overlay */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#09090B]">
                <SafeImage
                  src={item.anime.coverImage}
                  alt={item.anime.titleRomaji}
                  className="h-full w-full object-cover group-hover:brightness-110 transition-all duration-300"
                  fallbackLabel={item.anime.titleRomaji}
                />

                {/* Score Badge (Amber #F4B860) */}
                {item.score > 0 && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-[#09090B]/85 backdrop-blur-md px-2 py-0.5 border border-[#F4B860]/30 text-[#F4B860] text-[11px] font-bold shadow-md">
                    <Star className="h-3 w-3 fill-[#F4B860]" />
                    <span>{item.score}</span>
                  </div>
                )}

                {/* Quick Edit, Explain & Share Overlay Buttons */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                  <button
                    onClick={() => handleShareCard(item)}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#6366F1] px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-[#4F46E5] shadow-lg transition-all"
                    title="Export or share anime card with rating"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share Card</span>
                  </button>

                  <button
                    onClick={() => setSelectedAnimeForEdit(item)}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#27272A] bg-[#141417] px-2.5 py-1 text-[11px] font-semibold text-[#F4F4F5] hover:bg-[#18181C] transition-all"
                    title="Edit entry & sync to AniList"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Edit Entry</span>
                  </button>

                  <button
                    onClick={() => handleOpenExplanation(item)}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#27272A] bg-[#141417] px-2.5 py-1 text-[11px] font-semibold text-[#F4F4F5] hover:bg-[#18181C] transition-all"
                  >
                    <HelpCircle className="h-3 w-3 text-[#6366F1]" />
                    <span>Why I Like</span>
                  </button>
                </div>

                <div className="absolute bottom-2 left-2">
                  <span className="rounded bg-[#09090B]/85 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-semibold text-[#A1A1AA] border border-[#27272A]">
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Meta info */}
              <div className="p-3 flex flex-col justify-between flex-1 space-y-2">
                <div>
                  <h4 className="text-xs font-semibold text-[#F4F4F5] line-clamp-1 group-hover:text-[#6366F1] transition-colors">
                    {item.anime.titleRomaji}
                  </h4>
                  <p className="text-[10px] text-[#71717A] line-clamp-1 mt-0.5">
                    {item.anime.genres.slice(0, 2).map((g) => g.genre.name).join(' · ')}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1F1F22] flex items-center justify-between text-[10px] text-[#71717A]">
                  <span>
                    Ep {item.progress} / {item.anime.episodes || '?'}
                  </span>
                  <a
                    href={`https://anilist.co/anime/${item.anime.anilistId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#71717A] hover:text-[#6366F1] transition-colors"
                    title="View on AniList"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <QuickEditModal
        isOpen={!!selectedAnimeForEdit}
        onClose={() => setSelectedAnimeForEdit(null)}
        anime={selectedAnimeForEdit}
        onSuccess={() => {
          if (onRefresh) onRefresh();
        }}
      />

      <ExplainableModal
        isOpen={!!selectedExplanation}
        onClose={() => setSelectedExplanation(null)}
        explanation={selectedExplanation}
      />

      <ShareableAnimeCardModal
        isOpen={!!selectedAnimeForShare}
        onClose={() => setSelectedAnimeForShare(null)}
        anime={selectedAnimeForShare}
      />
    </div>
  );
}


