'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SafeImage } from '@/components/ui/SafeImage';
import { ComputedUserAnalytics } from '@/types/analytics';
import {
  Star,
  Film,
  Eye,
  BarChart3,
  Sparkles,
  UserCheck,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface PublicProfileData {
  user: {
    username: string;
    avatar?: string;
    isDemo?: boolean;
    isPublicView?: boolean;
  };
  analytics: ComputedUserAnalytics;
  library?: any[];
}

export default function PublicProfilePage() {
  const params = useParams();
  const username = typeof params.username === 'string' ? params.username : '';
  const [data, setData] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    (async () => {
      try {
        const res = await fetch(`/api/dashboard?user=${encodeURIComponent(username)}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load public profile:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  const analytics = data?.analytics;
  const character = analytics?.characterMatch;
  const archetype = analytics?.archetype?.primary;
  const topAnime = data?.library
    ?.filter((a: any) => a.score > 0)
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 12);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] selection:bg-[#6366F1]/30 selection:text-white">
      {/* Minimal Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[#27272A] bg-[#09090B]/90 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-[#6366F1] font-bold text-xl leading-none">◈</span>
            <span className="font-display text-lg font-bold tracking-tight text-[#F4F4F5]">
              Anime<span className="text-[#6366F1]">OS</span>
            </span>
          </Link>
          <span className="rounded-full bg-[#6366F1]/10 px-3 py-1 text-[10px] font-bold text-[#818CF8] border border-[#6366F1]/20 uppercase tracking-wider">
            Public Profile
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {loading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-32 rounded-2xl bg-[#141417]" />
            <div className="h-48 rounded-2xl bg-[#141417]" />
            <div className="h-64 rounded-2xl bg-[#141417]" />
          </div>
        ) : !data ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-lg font-semibold text-[#F4F4F5]">Profile not found</p>
            <p className="text-sm text-[#A1A1AA]">
              Could not load the profile for <span className="font-bold text-[#6366F1]">@{username}</span>.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[#6366F1] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4F46E5] transition-colors mt-4"
            >
              Go to AnimeOS
            </Link>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Profile Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-[#27272A] bg-gradient-to-br from-[#12121A] via-[#0F0F14] to-[#09090B] p-6 sm:p-8">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#6366F1]/8 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <SafeImage
                  src={data.user.avatar}
                  alt={username}
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover border-2 border-[#6366F1]/40 shadow-xl"
                  fallbackLabel={username}
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F5]">
                      {username}
                    </h1>
                    <span className="rounded-full bg-[#34D399]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#34D399] border border-[#34D399]/20">
                      ANIME FAN
                    </span>
                  </div>
                  <p className="text-xs text-[#A1A1AA]">
                    Anime taste profile powered by AnimeOS · Data synced via AniList
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            {analytics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-[#27272A] bg-[#0F0F12] p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#71717A]">
                    <Film className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Anime Watched</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-[#F4F4F5]">
                    {analytics.totalWatched}
                  </p>
                </div>

                <div className="rounded-xl border border-[#27272A] bg-[#0F0F12] p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#71717A]">
                    <Eye className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Episodes</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-[#F4F4F5]">
                    {analytics.episodesWatched.toLocaleString()}
                  </p>
                </div>

                <div className="rounded-xl border border-[#27272A] bg-[#0F0F12] p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#71717A]">
                    <Star className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Avg Rating</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-[#F4B860]">
                    {analytics.meanScore > 0 ? analytics.meanScore.toFixed(1) : 'N/A'}
                  </p>
                </div>

                <div className="rounded-xl border border-[#27272A] bg-[#0F0F12] p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#71717A]">
                    <BarChart3 className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Completion</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-[#34D399]">
                    {analytics.completionRate}%
                  </p>
                </div>
              </div>
            )}

            {/* Character Match + Archetype Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Character Match */}
              {character && (
                <div className="relative overflow-hidden rounded-2xl border border-[#27272A] bg-gradient-to-br from-[#12121A] to-[#09090B] p-5 space-y-4">
                  <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#6366F1]/10 blur-3xl pointer-events-none" />

                  <div className="flex items-center gap-1.5 relative z-10">
                    <Sparkles className="h-3.5 w-3.5 text-[#6366F1]" />
                    <span className="text-[10px] font-bold text-[#818CF8] uppercase tracking-wider">
                      Anime Personality
                    </span>
                  </div>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative shrink-0">
                      <SafeImage
                        src={character.avatarUrl}
                        alt={character.characterName}
                        className="h-16 w-16 rounded-xl object-cover border-2 border-[#6366F1]/40 shadow-lg"
                        fallbackLabel={character.characterName}
                      />
                      <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#6366F1] text-white shadow">
                        <UserCheck className="h-3 w-3" />
                      </div>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <h3 className="font-display text-lg font-bold text-[#F4F4F5]">
                        {character.characterName}
                      </h3>
                      <p className="text-[11px] text-[#A1A1AA]">
                        from {character.animeTitle}
                      </p>
                      <span className="inline-block rounded bg-[#34D399]/10 px-2 py-0.5 text-[10px] font-bold text-[#34D399] border border-[#34D399]/20">
                        {character.matchPercentage}% Match
                      </span>
                    </div>
                  </div>

                  {character.description && (
                    <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2 relative z-10">
                      {character.description}
                    </p>
                  )}
                </div>
              )}

              {/* Archetype */}
              {archetype && (
                <div className="rounded-2xl border border-[#27272A] bg-gradient-to-br from-[#12121A] to-[#09090B] p-5 space-y-3">
                  <div className="flex items-center gap-1.5">
                    <BarChart3 className="h-3.5 w-3.5 text-[#8B5CF6]" />
                    <span className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider">
                      Taste Archetype
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#F4F4F5]">
                    {archetype.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA]">{archetype.subtitle}</p>
                  {archetype.description && (
                    <p className="text-xs text-[#71717A] leading-relaxed line-clamp-3">
                      {archetype.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Top Rated Anime Grid */}
            {topAnime && topAnime.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-base font-bold text-[#F4F4F5]">
                    Top Rated Anime
                  </h2>
                  <span className="text-[10px] text-[#71717A] font-medium">
                    by {username}'s personal ratings
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {topAnime.map((item: any) => (
                    <div
                      key={item.id}
                      className="group rounded-xl border border-[#27272A] bg-[#0F0F12] overflow-hidden hover:border-[#3F3F46] transition-all"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden bg-[#09090B]">
                        <SafeImage
                          src={item.anime?.coverImage}
                          alt={item.anime?.titleRomaji || 'Anime'}
                          className="h-full w-full object-cover group-hover:brightness-110 transition-all"
                          fallbackLabel={item.anime?.titleRomaji}
                        />

                        {item.score > 0 && (
                          <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 rounded bg-[#09090B]/85 backdrop-blur-md px-1.5 py-0.5 border border-[#F4B860]/30 text-[#F4B860] text-[10px] font-bold shadow">
                            <Star className="h-2.5 w-2.5 fill-[#F4B860]" />
                            <span>{item.score}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-2">
                        <p className="text-[10px] font-semibold text-[#F4F4F5] line-clamp-1">
                          {item.anime?.titleRomaji}
                        </p>
                        <p className="text-[9px] text-[#71717A] line-clamp-1 mt-0.5">
                          {item.anime?.genres?.slice(0, 2).map((g: any) => g.genre?.name || g).join(' · ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Genre Distribution (if available) */}
            {analytics?.genreStats && analytics.genreStats.length > 0 && (
              <div className="rounded-2xl border border-[#27272A] bg-[#0F0F12] p-5 space-y-4">
                <h3 className="font-display text-sm font-bold text-[#F4F4F5]">
                  Top Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analytics.genreStats.slice(0, 8).map((g: any) => (
                    <div
                      key={g.genre}
                      className="flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#141417] px-3 py-2"
                    >
                      <span className="text-xs font-semibold text-[#F4F4F5]">{g.genre}</span>
                      <span className="rounded bg-[#6366F1]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#818CF8]">
                        {g.count} anime
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-2xl border border-[#6366F1]/20 bg-gradient-to-r from-[#6366F1]/5 to-transparent p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-display text-base font-bold text-[#F4F4F5]">
                  Want your own AnimeOS profile?
                </h3>
                <p className="text-xs text-[#A1A1AA]">
                  Connect your AniList account and discover your anime personality.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-[#6366F1] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#4F46E5] shadow-lg transition-all shrink-0"
              >
                <span>Get Started</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Footer */}
            <div className="text-center py-4 text-[10px] text-[#71717A] font-mono">
              AnimeOS · Powered by AniList API · animeos.app
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
