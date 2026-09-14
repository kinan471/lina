import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; 

    if (password === adminPassword) {
      const cookieStore = await cookies();
      cookieStore.set('auth_token', process.env.AUTH_TOKEN_SECRET || 'secure_session_token_123', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
      });
      return NextResponse.json({ message: 'Authenticated' }, { status: 200 });
    }
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
