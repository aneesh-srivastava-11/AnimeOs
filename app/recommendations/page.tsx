'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RecommendationCard } from '@/components/recommendations/RecommendationCard';
import { RecommendedAnimeCard } from '@/lib/recommendations/recommendationEngine';
import { RecommendationSkeleton } from '@/components/ui/SkeletonLoaders';
import { EmptyState } from '@/components/ui/EmptyState';
import { Compass } from 'lucide-react';

interface RecommendationsResponse {
  recommendations: RecommendedAnimeCard[];
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<RecommendedAnimeCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string; avatar?: string; isDemo?: boolean } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [meRes, recRes] = await Promise.all([
          fetch('/api/auth/me'),
          fetch('/api/recommendations'),
        ]);

        if (meRes.ok) {
          const meData = await meRes.json();
          setUser(meData.user);
        }

        if (recRes.ok) {
          const recData: RecommendationsResponse = await recRes.json();
          setRecommendations(recData.recommendations);
        }
      } catch (err) {
        console.error('Failed to load recommendations:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5] flex flex-col selection:bg-[#6366F1]/30 selection:text-white">
      <Navbar user={user} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F5]">
              Made for your taste
            </h1>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
              Curated candidate shows based on your Anime DNA preferences and score behavior.
            </p>
          </div>

          {loading ? (
            <RecommendationSkeleton />
          ) : recommendations.length > 0 ? (
            <div className="space-y-4 animate-fade-in">
              {recommendations.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Recommendations Available"
              description="Rate and complete more anime on AniList so our recommendation engine can curate shows for your taste."
              icon={Compass}
            />
          )}
        </main>
      </div>
    </div>
  );
}
