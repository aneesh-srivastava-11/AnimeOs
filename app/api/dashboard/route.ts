import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { syncUserAniList } from '@/lib/anilist/sync';

export async function GET() {
  const session = await getSession();

  // If no active session, compute analytics for demo dataset automatically
  const userId = session?.userId || 'demo-user-1';
  const anilistId = session?.anilistId || 999999;
  const accessToken = session?.accessToken;

  const result = await syncUserAniList(userId, anilistId, accessToken);
  return NextResponse.json({
    user: {
      username: session?.username || 'OtakuExplorer',
      avatar: session?.avatar || 'https://s4.anilist.co/file/anilistcdn/user/avatar/large/default.png',
      isDemo: session?.isDemo ?? true,
    },
    analytics: result.analytics,
    library: result.userAnimes,
  });
}
