'use client';

import React, { useRef, useState } from 'react';
import { X, Download, Share2, Copy, Check, Sparkles, UserCheck, ExternalLink } from 'lucide-react';
import { CharacterMatch } from '@/types/analytics';
import { SafeImage } from './SafeImage';
import { downloadCardAsPng, copyCardImageToClipboard } from '@/lib/utils/cardExporter';

interface ShareableCharacterCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: CharacterMatch | null;
  username?: string;
}

export function ShareableCharacterCardModal({
  isOpen,
  onClose,
  match,
  username = 'Viewer',
}: ShareableCharacterCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  if (!isOpen || !match) return null;

  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/dashboard?user=${encodeURIComponent(username)}`
    : `https://animeos.app/dashboard?user=${encodeURIComponent(username)}`;

  const shareText = `I got matched as ${match.characterName} (${match.animeTitle}) on AnimeOS with a ${match.matchPercentage}% compatibility match!\nProfile: ${profileUrl}`;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      await downloadCardAsPng(cardRef.current, `AnimeOS_Personality_${match.characterName}.png`);
    } catch (err) {
      alert('Could not download card image. Please take a screenshot!');
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
          <h2 className="font-display text-xl font-bold text-[#F4F4F5]">Share Anime Personality Card</h2>
          <p className="text-xs text-[#A1A1AA]">
            Export or share your character match card with your score & traits.
          </p>
        </div>

        {/* Exportable Character Card Frame */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl border border-[#6366F1]/40 bg-gradient-to-br from-[#12121A] via-[#0F0F14] to-[#09090B] p-6 space-y-5 shadow-2xl text-[#F4F4F5]"
        >
          {/* Subtle Radial Backlight */}
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#6366F1]/15 blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-[#27272A]/80 pb-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-[#6366F1] font-bold text-xl leading-none">◈</span>
              <span className="font-display text-base font-bold tracking-tight text-[#F4F4F5]">
                Anime<span className="text-[#6366F1]">OS</span>
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3 py-0.5 text-[10px] font-bold text-[#818CF8]">
              <Sparkles className="h-3 w-3" />
              <span>ANIME PERSONALITY MATCH</span>
            </div>
          </div>

          {/* Persona Header Details */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative shrink-0">
              <SafeImage
                src={match.avatarUrl}
                alt={match.characterName}
                className="h-20 w-20 rounded-2xl object-cover border-2 border-[#6366F1]/50 shadow-xl"
                fallbackLabel={match.characterName}
              />
              <div className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#6366F1] text-white shadow-md">
                <UserCheck className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <p className="text-[10px] text-[#A1A1AA] uppercase font-semibold">Matching Character</p>
              <h3 className="font-display text-2xl font-bold text-[#F4F4F5]">
                You are <span className="text-[#6366F1]">{match.characterName}</span>
              </h3>
              <p className="text-xs text-[#A1A1AA]">({match.animeTitle})</p>
            </div>
          </div>

          {/* Match Score & Trait Overlaps Box */}
          <div className="rounded-xl border border-[#27272A] bg-[#0F0F12]/90 p-4 space-y-3 relative z-10">
            <div className="flex items-center justify-between border-b border-[#1F1F22] pb-2">
              <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                Compatibility Match
              </span>
              <span className="font-display text-xl font-bold text-[#34D399]">
                {match.matchPercentage}%
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
                Top Trait Overlaps
              </p>
              {match.overlappingTraits.map((t, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#F4F4F5]">{t.trait}</span>
                    <span className="text-[#818CF8] font-medium">{t.matchScore}% match</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#18181C] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                      style={{ width: `${t.matchScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Persona Quote */}
          {match.quote && (
            <p className="text-xs italic text-[#A1A1AA] pt-1 relative z-10 font-mono text-center">
              "{match.quote}"
            </p>
          )}

          {/* Card Footer Signature */}
          <div className="pt-3 border-t border-[#27272A]/80 flex items-center justify-between text-[10px] text-[#A1A1AA] relative z-10 font-mono">
            <div>
              Matched for <span className="text-[#F4F4F5] font-bold">@{username}</span>
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
