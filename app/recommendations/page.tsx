'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RecommendationCard } from '@/components/recommendations/RecommendationCard';
import { RecommendedAnimeCard } from '@/lib/recommendations/recommendationEngine';
import { Compass, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-[#090D16] flex flex-col">
      <Navbar user={user} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 w-full">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              Personalized Recommendations
              <Sparkles className="h-6 w-6 text-indigo-400" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Shows selected specifically for your Anime DNA with clear match explanations.
            </p>
          </div>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-44 rounded-2xl bg-slate-900/60 border border-slate-800" />
              <div className="h-44 rounded-2xl bg-slate-900/60 border border-slate-800" />
            </div>
          ) : recommendations.length > 0 ? (
            <div className="space-y-5">
              {recommendations.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center border border-slate-800">
              <Compass className="mx-auto h-8 w-8 text-slate-600 mb-2" />
              <h3 className="text-sm font-semibold text-slate-300">No Recommendations Found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Rate more anime on AniList to help our recommendation engine learn your taste.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
