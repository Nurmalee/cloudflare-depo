'use server';

import { cookies } from 'next/headers';

export async function manageTokenCookie(action: 'set' | 'clear', token?: string) {
  const cookieStore = cookies();

  const options = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    httpOnly: true,
    path: '/',
    name: 'access_token',
    value: action === 'set' && token ? token : '',
    maxAge: action === 'set' ? 60 * 60 * 24 * 7 : 0, // 7 days for 'set', immediate expiry for 'clear'
  };

  cookieStore.set(options);
}