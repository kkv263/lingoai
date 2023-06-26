import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const SUPABASE_URL = process.env.NODE_ENV === 'production' ? process.env.SUPABASE_URL as string : PUBLIC_SUPABASE_URL
export const SUPABASE_ANON_KEY = process.env.NODE_ENV === 'production' ? process.env.SUPABASE_ANON_KEY as string : PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)