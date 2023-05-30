import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load = (async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/')
  }

  const { data: messages } = await supabase
    .from('messages')
    .select(`content, created_at, id, translated_content, sender_id`)
    .eq('user_id', session.user.id)
    .order('id')
  return { session, messages }

}) satisfies PageServerLoad

export const actions = {
  send: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData()
    const message = formData.get('msg') as string

    const session = await getSession()

    const { error } = await supabase.from('messages').upsert({
      user_id: session?.user.id,
      content: message,
      created_at: new Date(),
      sender_id: 0
    })

    if (error) {
      return fail(500, {
        message,
      })
    }

    return {
      message,
    }
  },

  signout: async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (session) {
      await supabase.auth.signOut()
      throw redirect(303, '/')
    }
  },
} satisfies Actions