import { cookies } from 'next/headers';

export interface UserSession {
  userId: string;
  anilistId: number;
  username: string;
  avatar?: string;
  accessToken?: string;
  isDemo?: boolean;
}

const SESSION_COOKIE_NAME = 'animeos_session';

export async function createSession(sessionData: UserSession): Promise<void> {
  const cookieStore = await cookies();
  const payload = Buffer.from(JSON.stringify(sessionData)).toString('base64');
  
  cookieStore.set(SESSION_COOKIE_NAME, payload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function getSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!cookie?.value) return null;
    
    const jsonStr = Buffer.from(cookie.value, 'base64').toString('utf-8');
    const session = JSON.parse(jsonStr) as UserSession;
    return session;
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
