'use client';

import React, { useRef, useState } from 'react';
import { ComputedUserAnalytics } from '@/types/analytics';
import { X, Share2, Download, Copy, Check } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { downloadCardAsPng, copyCardImageToClipboard } from '@/lib/utils/cardExporter';

interface ShareableCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  analytics?: ComputedUserAnalytics | null;
  username?: string;
}

export function ShareableCardModal({ isOpen, onClose, analytics, username = 'Viewer' }: ShareableCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  if (!isOpen || !analytics) return null;

  const character = analytics.characterMatch;
  const archetype = analytics.archetype?.primary;
  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/dashboard?user=${encodeURIComponent(username)}`
    : `https://animeos.app/dashboard?user=${encodeURIComponent(username)}`;
  const shareText = `Check out my AnimeOS Taste Summary for @${username}!\nProfile: ${profileUrl}`;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      await downloadCardAsPng(cardRef.current, `AnimeOS_Taste_Summary_${username}.png`);
    } catch (err) {
      alert('Could not download image directly. Please take a screenshot!');
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
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
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
          <h2 className="font-display text-xl font-bold text-[#F4F4F5]">Share Anime Taste Card</h2>
          <p className="text-xs text-[#A1A1AA]">
            Export or share your overall taste summary and personality match.
          </p>
        </div>

        {/* Shareable Card Frame */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl border border-[#6366F1]/30 bg-gradient-to-br from-[#12121A] via-[#0F0F12] to-[#09090B] p-6 space-y-6 shadow-2xl text-[#F4F4F5]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#6366F1] font-bold text-xl leading-none">◈</span>
              <span className="font-display text-lg font-bold tracking-tight text-[#F4F4F5]">
                Anime<span className="text-[#6366F1]">OS</span>
              </span>
            </div>
            <span className="rounded-full bg-[#6366F1]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#818CF8] border border-[#6366F1]/20">
              2026 TASTE SUMMARY
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-[#71717A]">Anime OS Profile for</p>
            <h3 className="font-display text-2xl font-bold text-[#F4F4F5]">{username}</h3>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 rounded-xl border border-[#27272A] bg-[#141417] p-3 text-center">
            <div>
              <p className="font-display text-lg font-bold text-[#F4F4F5]">{analytics.totalWatched}</p>
              <p className="text-[9px] text-[#71717A] uppercase">Anime</p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-[#F4F4F5]">{analytics.episodesWatched}</p>
              <p className="text-[9px] text-[#71717A] uppercase">Episodes</p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-[#F4B860]">{analytics.meanScore}</p>
              <p className="text-[9px] text-[#71717A] uppercase">Avg Rating</p>
            </div>
          </div>

          {/* Character Match Highlight */}
          {character && (
            <div className="flex items-center gap-3 rounded-xl border border-[#27272A] bg-[#141417]/80 p-3">
              <SafeImage
                src={character.avatarUrl}
                alt={character.characterName}
                className="h-12 w-12 rounded-xl object-cover border border-[#6366F1]/40 shrink-0"
                fallbackLabel={character.characterName}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[9px] text-[#6366F1] font-semibold uppercase">Anime Persona</p>
                <p className="font-display text-sm font-bold text-[#F4F4F5] truncate">
                  You are {character.characterName}
                </p>
                <p className="text-[10px] text-[#A1A1AA]">{character.matchPercentage}% compatibility match</p>
              </div>
            </div>
          )}

          {/* Archetype Badge */}
          {archetype && (
            <div className="rounded-xl border border-[#27272A] bg-[#141417]/80 p-3 space-y-1">
              <p className="text-[9px] text-[#8B5CF6] font-semibold uppercase">Taste Archetype</p>
              <p className="font-display text-sm font-bold text-[#F4F4F5]">{archetype.title}</p>
              <p className="text-[10px] text-[#71717A] line-clamp-1">{archetype.subtitle}</p>
            </div>
          )}

          <div className="pt-2 text-center text-[10px] text-[#71717A] font-mono">
            animeos.app • Connected via AniList API
          </div>
        </div>

        {/* Action Controls */}
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

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copiedLink ? 'Profile Link Copied!' : 'Copy Share Link with Profile'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

