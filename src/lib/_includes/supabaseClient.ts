import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from '$lib/types/supabase';

const SUPABASE_URL = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_SUPABASE_URL as string : PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_SUPABASE_ANON_KEY as string : PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)