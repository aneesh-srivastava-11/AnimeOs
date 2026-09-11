import { NextResponse } from 'next/server';
import { createSession } from '@/lib/auth/session';

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  await createSession({
    userId: 'demo-user-1',
    anilistId: 999999,
    username: 'OtakuExplorer',
    avatar: 'https://s4.anilist.co/file/anilistcdn/user/avatar/large/default.png',
    isDemo: true,
  });

  return NextResponse.redirect(new URL('/dashboard', appUrl));
}
