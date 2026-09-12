'use client';

import React from 'react';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse w-full">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-64 bg-[#141417] rounded-lg border border-[#27272A]" />
        <div className="h-4 w-96 bg-[#141417] rounded-md border border-[#27272A]" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-[#141417] border border-[#27272A]" />
        ))}
      </div>

      {/* Anime DNA Skeleton */}
      <div className="h-64 rounded-xl bg-[#141417] border border-[#27272A]" />

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-72 rounded-xl bg-[#141417] border border-[#27272A]" />
        <div className="h-72 rounded-xl bg-[#141417] border border-[#27272A]" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl bg-[#141417] border border-[#27272A] aspect-[3/4] animate-pulse overflow-hidden flex flex-col justify-between p-3">
      <div className="h-4 w-3/4 bg-[#18181C] rounded" />
      <div className="h-3 w-1/2 bg-[#18181C] rounded" />
    </div>
  );
}

export function RecommendationSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-44 rounded-xl bg-[#141417] border border-[#27272A]" />
      ))}
    </div>
  );
}
