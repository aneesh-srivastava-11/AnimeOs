import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { syncUserAniList } from '@/lib/anilist/sync';

export async function GET(request: NextRequest) {
  const session = await getSession();
  const searchParams = request.nextUrl.searchParams;
  const requestedUser = searchParams.get('user');

  // Determine user to load
  const isSelf = !requestedUser || requestedUser.toLowerCase() === session?.username?.toLowerCase();

  const username = isSelf ? session?.username : requestedUser;
  const userId = isSelf ? (session?.userId || 'demo-user-1') : `public-user-${requestedUser}`;
  const anilistId = isSelf ? (session?.anilistId || 0) : 0;
  const accessToken = isSelf ? session?.accessToken : undefined;

  // If viewing self and no logged-in session, return demo data
  if (isSelf && !session?.username) {
    const result = await syncUserAniList('demo-user-1', 999999);
    return NextResponse.json({
      user: {
        username: 'OtakuExplorer',
        avatar: 'https://s4.anilist.co/file/anilistcdn/user/avatar/large/default.png',
        isDemo: true,
        isPublicView: false,
      },
      analytics: result.analytics,
      library: result.userAnimes,
    });
  }

  // Fetch real data from AniList
  const result = await syncUserAniList(userId, anilistId, accessToken, username || undefined);

  // Avatar priority: AniList profile avatar -> session avatar -> DiceBear fallback
  const resolvedAvatar =
    result.userProfile?.avatar ||
    (isSelf ? session?.avatar : undefined) ||
    `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username || 'user')}`;

  const resolvedUsername = result.userProfile?.username || username || 'OtakuExplorer';

  return NextResponse.json({
    user: {
      username: resolvedUsername,
      avatar: resolvedAvatar,
      isDemo: result.isDemo,
      isPublicView: !isSelf,
    },
    analytics: result.analytics,
    library: result.userAnimes,
  });
}

