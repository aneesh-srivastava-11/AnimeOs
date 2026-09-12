'use client';

import React, { useRef, useState } from 'react';
import { X, Download, Share2, Copy, Check, Star, ExternalLink, Sparkles } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { downloadCardAsPng, copyCardImageToClipboard } from '@/lib/utils/cardExporter';

export interface AnimeShareData {
  id: string;
  titleRomaji: string;
  titleEnglish?: string | null;
  coverImage?: string | null;
  score?: number | null;
  averageScore?: number | null;
  status?: string;
  episodes?: number | null;
  format?: string | null;
  genres?: string[];
  whyExplanation?: string;
  userQuote?: string;
  anilistId?: number;
}

interface ShareableAnimeCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  anime: AnimeShareData | null;
  username?: string;
}

export function ShareableAnimeCardModal({
  isOpen,
  onClose,
  anime,
  username = 'Viewer',
}: ShareableAnimeCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  if (!isOpen || !anime) return null;

  const scoreDisplay = anime.score ? `${anime.score}/10` : (anime.averageScore ? `${anime.averageScore}%` : 'N/A');
  const profileUrl = typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : 'https://animeos.app/dashboard';
  const shareText = `Check out my rating for ${anime.titleRomaji} on AnimeOS!\nMy Rating: ${scoreDisplay}\nProfile: ${profileUrl}`;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const filename = `AnimeOS_${anime.titleRomaji.replace(/[^a-zA-Z0-9]/g, '_')}_Rating.png`;
      await downloadCardAsPng(cardRef.current, filename);
    } catch (err) {
      alert('Could not download image. Please screenshot the card!');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    const success = await copyCardImageToClipboard(cardRef.current);
    if (success) {
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2500);
    } else {
      alert('Copied link text to clipboard instead!');
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#27272A] bg-[#09090B] p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-[#71717A] hover:bg-[#18181C] hover:text-[#F4F4F5] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold text-[#F4F4F5]">Share Anime Card</h2>
          <p className="text-xs text-[#A1A1AA]">
            Export or share your personal rating & analysis card for this anime.
          </p>
        </div>

        {/* Visual Exportable Anime Card */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl border border-[#6366F1]/40 bg-gradient-to-br from-[#12121A] via-[#0F0F14] to-[#09090B] p-6 space-y-5 shadow-2xl text-[#F4F4F5]"
        >
          {/* Subtle Radial Backlight */}
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#6366F1]/15 blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between relative z-10 border-b border-[#27272A]/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[#6366F1] font-bold text-xl leading-none">◈</span>
              <span className="font-display text-base font-bold tracking-tight text-[#F4F4F5]">
                Anime<span className="text-[#6366F1]">OS</span>
              </span>
            </div>
            <span className="rounded-full bg-[#6366F1]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#818CF8] border border-[#6366F1]/20">
              ANIME RATING CARD
            </span>
          </div>

          {/* Main Card Content Grid */}
          <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
            {/* Anime Poster */}
            <div className="relative shrink-0 w-28 aspect-[2/3] rounded-xl overflow-hidden border-2 border-[#6366F1]/30 shadow-xl bg-[#09090B]">
              <SafeImage
                src={anime.coverImage}
                alt={anime.titleRomaji}
                className="h-full w-full object-cover"
                fallbackLabel={anime.titleRomaji}
              />
            </div>

            {/* Anime Information */}
            <div className="space-y-2.5 flex-1 min-w-0">
              <div>
                <h3 className="font-display text-lg font-bold text-[#F4F4F5] uppercase tracking-tight leading-tight line-clamp-2">
                  {anime.titleRomaji}
                </h3>
                {anime.titleEnglish && anime.titleEnglish !== anime.titleRomaji && (
                  <p className="text-xs text-[#A1A1AA] truncate mt-0.5">{anime.titleEnglish}</p>
                )}
              </div>

              {/* Rating Badge */}
              <div className="inline-flex items-center gap-2 rounded-lg bg-[#F4B860]/10 border border-[#F4B860]/30 px-3 py-1 text-sm font-bold text-[#F4B860]">
                <Star className="h-4 w-4 fill-[#F4B860]" />
                <span>USER RATING: {scoreDisplay}</span>
              </div>

              {/* Format & Status badges */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                {anime.status && (
                  <span className="rounded bg-[#18181C] px-2 py-0.5 font-semibold text-[#A1A1AA] border border-[#27272A]">
                    {anime.status}
                  </span>
                )}
                {anime.format && (
                  <span className="rounded bg-[#18181C] px-2 py-0.5 font-semibold text-[#A1A1AA] border border-[#27272A]">
                    {anime.format}
                  </span>
                )}
                {anime.episodes && (
                  <span className="rounded bg-[#18181C] px-2 py-0.5 font-semibold text-[#A1A1AA] border border-[#27272A]">
                    {anime.episodes} Eps
                  </span>
                )}
              </div>

              {/* Genres */}
              {anime.genres && anime.genres.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {anime.genres.slice(0, 3).map((g) => (
                    <span
                      key={g}
                      className="rounded bg-[#6366F1]/10 px-2 py-0.5 text-[9px] font-medium text-[#818CF8] border border-[#6366F1]/20"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Explanation / Quote Box */}
          {(anime.whyExplanation || anime.userQuote) && (
            <div className="rounded-xl border border-[#27272A] bg-[#0F0F12]/90 p-3 space-y-1 text-xs relative z-10">
              <p className="text-[10px] font-bold text-[#6366F1] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>TASTE INSIGHT</span>
              </p>
              <p className="text-[#D4D4D8] leading-relaxed italic text-[11px]">
                "{anime.whyExplanation || anime.userQuote}"
              </p>
            </div>
          )}

          {/* Card Footer Signature & Profile Link */}
          <div className="pt-3 border-t border-[#27272A]/80 flex items-center justify-between text-[10px] text-[#A1A1AA] relative z-10 font-mono">
            <div>
              Rated by <span className="text-[#F4F4F5] font-bold">@{username}</span>
            </div>
            <div className="text-[#818CF8]">animeos.app</div>
          </div>
        </div>

        {/* Share & Download Action Buttons */}
        <div className="space-y-3 no-export">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6366F1] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#4F46E5] shadow-lg transition-all disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>{downloading ? 'Exporting...' : 'Download Card PNG'}</span>
            </button>

            <button
              onClick={handleCopyImage}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#27272A] bg-[#141417] px-4 py-2.5 text-xs font-semibold text-[#F4F4F5] hover:bg-[#18181C] transition-all"
            >
              {copiedImage ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-[#818CF8]" />}
              <span>{copiedImage ? 'Card Image Copied!' : 'Copy Card Image'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copiedLink ? 'Profile Link Copied!' : 'Copy Share Link with Profile'}</span>
            </button>

            <button
              onClick={handleShareTwitter}
              className="inline-flex items-center gap-1 text-[#818CF8] hover:text-white transition-colors font-medium"
            >
              <span>Share on X</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
