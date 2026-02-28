import { createClient } from '@supabase/supabase-js';

// Supabase client configured with explicit public URL and key
// instead of relying on NEXT_PUBLIC_* environment variables.
const supabaseUrl = 'https://fmqrvbmsscroiwshtljj.supabase.co';
const supabaseAnonKey =
  'sb_publishable_mLR3B00g3-4M5aUDGY80tg_8AS88-kB';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
