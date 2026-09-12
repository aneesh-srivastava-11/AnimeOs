'use client';

import React, { useState } from 'react';
import { SyncedUserAnime } from '@/types/analytics';
import { X, Save, RefreshCw } from 'lucide-react';

interface QuickEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  anime: SyncedUserAnime | null;
  onSuccess: () => void;
}

export function QuickEditModal({ isOpen, onClose, anime, onSuccess }: QuickEditModalProps) {
  const [status, setStatus] = useState<SyncedUserAnime['status']>(anime?.status || 'COMPLETED');
  const [score, setScore] = useState<number>(anime?.score || 8.0);
  const [progress, setProgress] = useState<number>(anime?.progress || 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !anime) return null;

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      const mediaId = anime.anime.anilistId;
      const res = await fetch('/api/library/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaId,
          status,
          score,
          progress,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Failed to update AniList entry');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Update error:', err);
      setError(err?.message || 'Something went wrong while saving changes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-[#27272A] bg-[#0F0F12] p-6 shadow-2xl space-y-5">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-[#71717A] hover:bg-[#18181C] hover:text-[#F4F4F5] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          {anime.anime.coverImage && (
            <img
              src={anime.anime.coverImage}
              alt={anime.anime.titleRomaji}
              className="h-14 w-10 rounded object-cover border border-[#27272A]"
            />
          )}
          <div>
            <h3 className="font-display text-base font-bold text-[#F4F4F5] line-clamp-1">
              {anime.anime.titleEnglish || anime.anime.titleRomaji}
            </h3>
            <p className="text-xs text-[#6366F1]">Sync changes directly to AniList</p>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400">
            {error}
          </div>
        )}

        <div className="space-y-4 text-xs">
          {/* Status Select */}
          <div className="space-y-1.5">
            <label className="text-[#A1A1AA] font-semibold">Watch Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full rounded-lg border border-[#27272A] bg-[#141417] px-3 py-2 text-xs text-[#F4F4F5] focus:border-[#6366F1] focus:outline-none"
            >
              <option value="CURRENT">Watching (Current)</option>
              <option value="COMPLETED">Completed</option>
              <option value="PLANNING">Planning</option>
              <option value="PAUSED">Paused</option>
              <option value="DROPPED">Dropped</option>
            </select>
          </div>

          {/* Score Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-[#A1A1AA] font-semibold">Your Score (0 - 10)</label>
              <span className="font-bold text-[#6366F1]">{score}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={score}
              onChange={(e) => setScore(parseFloat(e.target.value))}
              className="w-full accent-[#6366F1]"
            />
          </div>

          {/* Episode Progress Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-[#A1A1AA] font-semibold">Episodes Watched</label>
              <span className="text-[#71717A]">Total: {anime.anime.episodes || '?'}</span>
            </div>
            <input
              type="number"
              min="0"
              max={anime.anime.episodes || 999}
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-[#27272A] bg-[#141417] px-3 py-2 text-xs text-[#F4F4F5] focus:border-[#6366F1] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#27272A] bg-[#141417] px-4 py-2 text-xs font-semibold text-[#A1A1AA] hover:text-[#F4F4F5]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-[#6366F1] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4F46E5] disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Saving to AniList...</span>
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                <span>Save to AniList</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
