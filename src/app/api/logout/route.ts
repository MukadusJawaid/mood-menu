import { NextResponse } from 'next/server';

const AUTH_COOKIE = 'mm_auth';

export async function POST() {
  const res = NextResponse.json({ success: true }, { status: 200 });
  res.cookies.set(AUTH_COOKIE, '', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  });
  return res;
}

