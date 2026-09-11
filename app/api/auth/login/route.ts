import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.ANILIST_CLIENT_ID;
  const redirectUri = process.env.ANILIST_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';

  if (!clientId || clientId === '12345' || clientId === '') {
    // If no client ID configured, redirect to demo login for instant testing
    return NextResponse.redirect(new URL('/api/auth/demo', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  const aniListAuthUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code`;

  return NextResponse.redirect(aniListAuthUrl);
}
