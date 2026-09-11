import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { syncUserAniList } from '@/lib/anilist/sync';

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await syncUserAniList(session.userId, session.anilistId, session.accessToken);
  return NextResponse.json(result);
}
