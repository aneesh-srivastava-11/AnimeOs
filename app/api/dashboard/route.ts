import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { syncUserAniList } from '@/lib/anilist/sync';

export async function GET(request: NextRequest) {
  const session = await getSession();
  const searchParams = request.nextUrl.searchParams;
  const requestedUser = searchParams.get('user');

  // Determine user to load
  const isSelf = !requestedUser || requestedUser.toLowerCase() === session?.username?.toLowerCase();

  const username = isSelf ? (session?.username || 'OtakuExplorer') : requestedUser;
  const userId = isSelf ? (session?.userId || 'demo-user-1') : `public-user-${username}`;
  const anilistId = isSelf ? (session?.anilistId || 999999) : 999999;
  const accessToken = isSelf ? session?.accessToken : undefined;

  const result = await syncUserAniList(userId, anilistId, accessToken);

  return NextResponse.json({
    user: {
      username: username,
      avatar: isSelf
        ? (session?.avatar || 'https://s4.anilist.co/file/anilistcdn/user/avatar/large/default.png')
        : `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
      isDemo: isSelf ? (session?.isDemo ?? true) : false,
      isPublicView: !isSelf,
    },
    analytics: result.analytics,
    library: result.userAnimes,
  });
}
