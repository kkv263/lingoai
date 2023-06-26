import { invalidate } from '$app/navigation'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { LayoutLoad } from './$types'

const SUPABASE_URL = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_SUPABASE_URL as string : PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_SUPABASE_ANON_KEY as string : PUBLIC_SUPABASE_ANON_KEY

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient({
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}