'use client';

import React from 'react';
import { AnimeExplanation } from '@/types/analytics';
import { X, Sparkles, HelpCircle } from 'lucide-react';

interface ExplainableModalProps {
  isOpen: boolean;
  onClose: () => void;
  explanation: AnimeExplanation | null;
}

export function ExplainableModal({ isOpen, onClose, explanation }: ExplainableModalProps) {
  if (!isOpen || !explanation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#27272A] bg-[#0F0F12] p-6 shadow-2xl space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-[#71717A] hover:bg-[#18181C] hover:text-[#F4F4F5] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="space-y-1 pr-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#818CF8]">
            <Sparkles className="h-3 w-3" />
            <span>WHY DO I LIKE THIS?</span>
          </div>

          <h3 className="font-display text-xl font-bold text-[#F4F4F5]">
            {explanation.title}
          </h3>

          <p className="text-xs text-[#A1A1AA] pt-1">
            {explanation.headline}
          </p>
        </div>

        {/* Summary Narrative */}
        <div className="rounded-xl border border-[#27272A] bg-[#141417] p-4 text-xs text-[#F4F4F5] leading-relaxed">
          {explanation.summary}
        </div>

        {/* Feature Match Bars */}
        <div className="space-y-3 text-xs">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">
            Library Pattern Alignment
          </p>

          <div className="space-y-2.5">
            {explanation.featureMatches.map((f, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-[#F4F4F5]">{f.feature}</span>
                  <span className="text-[#6366F1] font-semibold">
                    {f.userPreferenceLevel} ({f.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#18181C] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                    style={{ width: `${f.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#6366F1] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4F46E5] transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
