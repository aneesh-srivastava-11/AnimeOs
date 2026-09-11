import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { syncUserAniList } from '@/lib/anilist/sync';
import { getPersonalizedRecommendations } from '@/lib/recommendations/recommendationEngine';

export async function GET() {
  const session = await getSession();
  const userId = session?.userId || 'demo-user-1';
  const anilistId = session?.anilistId || 999999;
  const accessToken = session?.accessToken;

  const syncResult = await syncUserAniList(userId, anilistId, accessToken);
  const recommendations = await getPersonalizedRecommendations(
    syncResult.userAnimes,
    syncResult.analytics
  );

  return NextResponse.json({ recommendations });
}
