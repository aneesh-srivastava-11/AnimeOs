'use client';

import React from 'react';
import { TasteArchetype } from '@/types/analytics';
import { Brain, Swords, Heart, Compass, Flame, ShieldCheck, Sparkles } from 'lucide-react';

interface ArchetypeCardProps {
  archetype?: TasteArchetype;
}

const ICON_MAP: Record<string, any> = {
  Brain,
  Swords,
  Heart,
  Compass,
  Flame,
  ShieldCheck,
};

export function ArchetypeCard({ archetype }: ArchetypeCardProps) {
  if (!archetype) return null;

  const PrimaryIcon = ICON_MAP[archetype.primary.icon] || Sparkles;
  const SecondaryIcon = ICON_MAP[archetype.secondary.icon] || Sparkles;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Primary Archetype */}
      <div className="obsidian-card p-6 space-y-3 relative overflow-hidden border-l-4 border-l-[#6366F1]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20">
              <PrimaryIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#6366F1]">
                PRIMARY ARCHETYPE
              </p>
              <h3 className="font-display text-lg font-bold text-[#F4F4F5]">
                {archetype.primary.title}
              </h3>
            </div>
          </div>

          {archetype.primary.tagline && (
            <span className="rounded-full bg-[#141417] px-2.5 py-1 text-[10px] font-semibold text-[#A1A1AA] border border-[#27272A]">
              {archetype.primary.tagline}
            </span>
          )}
        </div>

        <p className="text-xs text-[#A1A1AA] leading-relaxed">
          {archetype.primary.description}
        </p>
      </div>

      {/* Secondary Archetype */}
      <div className="obsidian-card p-6 space-y-3 relative overflow-hidden border-l-4 border-l-[#8B5CF6]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20">
            <SecondaryIcon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B5CF6]">
              SECONDARY ARCHETYPE
            </p>
            <h3 className="font-display text-lg font-bold text-[#F4F4F5]">
              {archetype.secondary.title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#A1A1AA] leading-relaxed">
          {archetype.secondary.description}
        </p>
      </div>
    </div>
  );
}
