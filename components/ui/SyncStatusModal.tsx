'use client';

import React from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, X } from 'lucide-react';

export type SyncState = 'idle' | 'syncing' | 'complete' | 'error';

interface SyncStatusModalProps {
  status: SyncState;
  updatedCount?: number;
  errorMessage?: string;
  onClose: () => void;
  onRetry?: () => void;
}

export function SyncStatusModal({
  status,
  updatedCount = 0,
  errorMessage = 'Something went wrong while updating your library.',
  onClose,
  onRetry,
}: SyncStatusModalProps) {
  if (status === 'idle') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-slide-up">
      <div className="obsidian-card-elevated p-4 shadow-2xl border border-[#27272A] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#71717A] hover:text-[#F4F4F5] p-1"
        >
          <X className="h-4 w-4" />
        </button>

        {status === 'syncing' && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20">
                <RefreshCw className="h-4 w-4 animate-spin text-[#6366F1]" />
              </div>
              <div>
                <p className="font-display text-xs font-bold tracking-wide uppercase text-[#F4F4F5]">
                  SYNCING YOUR ANIME
                </p>
                <p className="text-[11px] text-[#A1A1AA]">Updating your library...</p>
              </div>
            </div>
            {/* Animated Progress Bar */}
            <div className="h-1.5 w-full rounded-full bg-[#09090B] overflow-hidden">
              <div className="h-full bg-[#6366F1] w-2/3 animate-pulse rounded-full" />
            </div>
          </div>
        )}

        {status === 'complete' && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <p className="font-display text-xs font-bold tracking-wide uppercase text-[#F4F4F5]">
                SYNC COMPLETE
              </p>
              <p className="text-[11px] text-[#34D399]">
                {updatedCount > 0 ? `${updatedCount} anime updated` : 'Library up to date'}
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <p className="font-display text-xs font-bold tracking-wide uppercase text-[#F4F4F5]">
                  SYNC FAILED
                </p>
                <p className="text-[11px] text-[#F87171] line-clamp-1">{errorMessage}</p>
              </div>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="w-full rounded-md bg-[#18181C] border border-[#27272A] py-1.5 text-xs font-medium text-[#F4F4F5] hover:bg-[#27272A] transition-colors"
              >
                Try again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
