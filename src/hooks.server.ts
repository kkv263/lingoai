import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import type { Handle } from '@sveltejs/kit'

const SUPABASE_URL = process.env.NODE_ENV === 'production' ? process.env.SUPABASE_URL as string : PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NODE_ENV === 'production' ? process.env.SUPABASE_ANON_KEY as string : PUBLIC_SUPABASE_ANON_KEY

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_ANON_KEY,
    event,
  })

  /**
   * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}