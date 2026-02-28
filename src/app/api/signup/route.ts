import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    console.log('API /api/signup called');
    const { email, password, fullName } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'email, password and fullName are required' },
        { status: 400 },
      );
    }

    const { data: userData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Optional: create user profile row (non-blocking)
    if (userData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userData.user.id,
          full_name: fullName,
          email,
        });

      if (profileError) {
        // Don't block signup if profile insert fails (likely RLS-related)
        console.error('Profile insert error:', profileError.message);
      }
    }

    return NextResponse.json({ user: userData.user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

