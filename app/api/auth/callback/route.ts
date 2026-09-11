import { NextRequest, NextResponse } from 'next/server';
import { fetchAniListGraphQL } from '@/lib/anilist/client';
import { GET_VIEWER_PROFILE } from '@/lib/anilist/queries';
import { createSession } from '@/lib/auth/session';
import { syncUserAniList } from '@/lib/anilist/sync';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (!code) {
    return NextResponse.redirect(new URL('/?error=missing_code', appUrl));
  }

  const clientId = process.env.ANILIST_CLIENT_ID;
  const clientSecret = process.env.ANILIST_CLIENT_SECRET;
  const redirectUri = process.env.ANILIST_REDIRECT_URI || `${appUrl}/api/auth/callback`;

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://anilist.co/api/v2/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Token exchange failed with status ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch Viewer Profile
    const profileData = await fetchAniListGraphQL<{
      Viewer: {
        id: number;
        name: string;
        avatar?: { large?: string; medium?: string };
      };
    }>(GET_VIEWER_PROFILE, {}, accessToken);

    const viewer = profileData.Viewer;

    // Create Session Cookie
    await createSession({
      userId: `user-${viewer.id}`,
      anilistId: viewer.id,
      username: viewer.name,
      avatar: viewer.avatar?.large || viewer.avatar?.medium,
      accessToken,
      isDemo: false,
    });

    // Run Initial Sync in background
    await syncUserAniList(`user-${viewer.id}`, viewer.id, accessToken);

    return NextResponse.redirect(new URL('/dashboard', appUrl));
  } catch (error) {
    console.error('OAuth Callback Error:', error);
    return NextResponse.redirect(new URL('/?error=oauth_failed', appUrl));
  }
}
