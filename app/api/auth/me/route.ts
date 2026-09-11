import { NextResponse } from 'next/server';
import { getSession, clearSession } from '@/lib/auth/session';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      userId: session.userId,
      anilistId: session.anilistId,
      username: session.username,
      avatar: session.avatar,
      isDemo: session.isDemo ?? false,
    },
  });
}

export async function POST() {
  await clearSession();
  return NextResponse.json({ success: true });
}
