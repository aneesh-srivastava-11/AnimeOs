'use client';

import React, { useRef, useState } from 'react';
import { CharacterMatch } from '@/types/analytics';
import { Sparkles, UserCheck, Download, Share2 } from 'lucide-react';
import { SafeImage } from '@/components/ui/SafeImage';
import { ShareableCharacterCardModal } from '@/components/ui/ShareableCharacterCardModal';
import { downloadCardAsPng } from '@/lib/utils/cardExporter';

interface CharacterMatchCardProps {
  match?: CharacterMatch;
  username?: string;
}

export function CharacterMatchCard({ match, username = 'Viewer' }: CharacterMatchCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  if (!match) return null;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      await downloadCardAsPng(cardRef.current, `AnimeOS_Personality_${match.characterName}.png`);
    } catch (err) {
      alert('Could not download image. Please screenshot!');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl border border-[#27272A] bg-gradient-to-br from-[#12121A] via-[#0F0F14] to-[#09090B] p-6 sm:p-8 shadow-2xl text-[#F4F4F5]"
      >
        {/* Background Radial Backlight */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#6366F1]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Persona Details */}
          <div className="flex items-start sm:items-center gap-5 flex-1">
            <div className="relative shrink-0">
              <SafeImage
                src={match.avatarUrl}
                alt={match.characterName}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover border-2 border-[#6366F1]/40 shadow-xl"
                fallbackLabel={match.characterName}
              />
              <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#6366F1] text-white shadow-md">
                <UserCheck className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3 py-0.5 text-[11px] font-semibold text-[#818CF8]">
                  <Sparkles className="h-3 w-3" />
                  <span>YOUR ANIME PERSONALITY</span>
                </div>
              </div>

              <div className="flex flex-wrap items-baseline gap-2">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F5]">
                  You are <span className="text-[#6366F1]">{match.characterName}</span>
                </h2>
                <span className="text-xs text-[#A1A1AA]">({match.animeTitle})</span>
              </div>

              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-xl">
                {match.description}
              </p>

              <p className="text-xs font-mono italic text-[#71717A] pt-1">
                "{match.quote}"
              </p>
            </div>
          </div>

          {/* Right: Compatibility Score Badge & Trait Overlaps + Action Buttons */}
          <div className="w-full md:w-72 shrink-0 rounded-xl border border-[#27272A] bg-[#0F0F12]/80 p-4 space-y-3">
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
                      className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] transition-all duration-500"
                      style={{ width: `${t.matchScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 no-export">
              <button
                onClick={() => setShareModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#6366F1] px-3 py-2 text-xs font-semibold text-white hover:bg-[#4F46E5] shadow-md transition-all"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#27272A] bg-[#141417] px-3 py-2 text-xs font-semibold text-[#F4F4F5] hover:bg-[#18181C] transition-all disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5 text-[#818CF8]" />
                <span>{downloading ? 'Export...' : 'Save PNG'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ShareableCharacterCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        match={match}
        username={username}
      />
    </>
  );
}


