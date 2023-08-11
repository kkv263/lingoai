import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { DEEPL_API_KEY } from '$env/static/private';
import * as deepl from 'deepl-node';
import { isJapanese } from 'wanakana';
import fs from 'fs';
import path from 'path';

import { OpenAI } from "langchain/llms/openai";
import { OPENAI_API_KEY } from '$env/static/private';

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";	

export const load = (async ({ locals: { supabase, getSession } }) => {
  // Delete all audio files if any.
  const directory = path.join("static", "audio");

  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });

  const session = await getSession()

  if (!session) {
    throw redirect(303, '/')
  }

  const { data: messages } = await supabase
    .from('messages')
    .select(`content, created_at, id, content_target_lang, content_source_lang, sender_id`)
    .eq('user_id', session.user.id)
    .order('id')

  const { data: profiles } = await supabase
    .from('profiles')
    .select(`username, display_name, avatar_url, id`)
    .eq('id', session.user.id)
    .single()

  
  const { data: chatbots } = await supabase
    .from('chatbots')
    .select()

  let lastMessages = [];

  if (chatbots && messages) {
    for (let index = 0; index < chatbots.length; index++) {
      lastMessages.push({...(messages.findLast(el => el.sender_id === chatbots[index].uuid)), name_en: chatbots[index].name_en, name_jp:chatbots[index].name_jp})
    }
  }

  lastMessages = lastMessages.sort((a, b) => (b.id) - (a.id));

  return { session, messages, profiles, lastMessages }

}) satisfies PageServerLoad

const generateMessage = async (message:string) => {

  const chat = new ChatOpenAI({ temperature: 0 });
  const response = await chat.call([
    new SystemChatMessage(
      "You are a casual friend that speaks Japanese."
    ),
    new HumanChatMessage(message),
    ]);

  return response;
};


export const actions = {
  send: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData()
    const message = formData.get('msg') as string
    const isMsgJapanese = isJapanese(message);

    const authKey = process.env.NODE_ENV === 'production' ? process.env.DEEPL_API_KEY as string : DEEPL_API_KEY;
    const translator = new deepl.Translator(authKey);

    const translatedMsg = !isMsgJapanese ? await translator.translateText(message, 'en', 'ja') : {text: message};

    const session = await getSession()
    const chatMessage = await generateMessage(translatedMsg.text)

    const { error } = await supabase.from('messages').upsert([{
      user_id: session?.user.id,
      content: message,
      ...(!isMsgJapanese && {content_source_lang: message}),
      ...(isMsgJapanese && {content_target_lang: message}),
      created_at: new Date(),
      sender_id: session?.user.id,
    }, {
      user_id: session?.user.id,
      content: chatMessage.text,
      content_target_lang: chatMessage.text,
      created_at: new Date(),
      sender_id: 1
    }])

    if (error) {
      return fail(500, {
        message,
      })
    }

    return {
      message,
    }
  },

  updatetranslation: async  ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const id = formData.get('transId') as string
    const content = formData.get('transContent') as string
    const translatedContent = formData.get('transTranslated');
    const translatedIsJapanese = isJapanese(content);

    if (translatedContent !== 'true') { return ;}

    const authKey = DEEPL_API_KEY;
    const translator = new deepl.Translator(authKey);
    const translatedVal = await translator.translateText(content, !translatedIsJapanese ? 'en' : 'ja', !translatedIsJapanese ? 'ja' : 'en-US');

    const { error } = await supabase.from('messages')
    .update({
      ...(!translatedIsJapanese && {content_target_lang: translatedVal.text}),
      ...(translatedIsJapanese && {content_source_lang: translatedVal.text}),
    })
    .eq('id', id);

    if (error) {
      return fail(500, {
        translatedVal,
      })
    }

    return {
      translatedVal,
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