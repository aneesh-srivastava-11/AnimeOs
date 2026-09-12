import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { fetchAniListGraphQL } from '@/lib/anilist/client';
import { SAVE_MEDIA_LIST_ENTRY } from '@/lib/anilist/mutations';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { mediaId, status, score, progress } = await req.json();

    if (!mediaId) {
      return NextResponse.json({ error: 'Missing mediaId' }, { status: 400 });
    }

    // If demo mode or no access token, simulate success
    if (session.userId.startsWith('demo') || !session.accessToken) {
      return NextResponse.json({
        success: true,
        isDemo: true,
        updatedEntry: { mediaId, status, score, progress },
      });
    }

    // Execute GraphQL Mutation on AniList
    const result = await fetchAniListGraphQL(
      SAVE_MEDIA_LIST_ENTRY,
      {
        mediaId: Number(mediaId),
        status,
        score: score ? Number(score) : undefined,
        progress: progress ? Number(progress) : undefined,
      },
      session.accessToken
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    console.error('Error updating AniList media list entry:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to update entry on AniList' },
      { status: 500 }
    );
  }
}
