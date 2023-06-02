
import type { RequestHandler } from "@sveltejs/kit";
import { OPENAI_API_KEY } from '$env/static/private';

const textToSpeech = async (body:any) => {
  // const prompt = ``;
  // fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': 'Bearer ' + OPENAI_API_KEY,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     'model': 'gpt-3.5-turbo',
  //     'messages': [
  //       {'role': 'user', 'content': prompt},
  //       {
  //         'role': 'system',
  //         'content': ``
  //       }
  //     ]
  //   })
  // })
  // return synth
};



export const POST: RequestHandler = async({request}) => {
  const body = await request.json();
  // const result = await textToSpeech(body);

  return new Response(JSON.stringify({ text: 'アメリカから来た友達こんにちは', translated: 'Hello friend from America' }), {
    status: 201,
  })
};