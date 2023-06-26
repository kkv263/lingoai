
import type { RequestHandler } from "@sveltejs/kit";
import { DEEPL_API_KEY } from '$env/static/private';
import * as deepl from 'deepl-node';

const authKey = process.env.NODE_ENV === 'production' ? process.env.DEEPL_API_KEY : DEEPL_API_KEY;
const translator = new deepl.Translator(authKey as string);

export const POST: RequestHandler = async({request}) => {
  const body = await request.json();
  const result = await translator.translateText(body.text, 'en', 'ja');

  return new Response(JSON.stringify(result), {
    status: 201,
  })
};