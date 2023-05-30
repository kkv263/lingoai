
import type { RequestHandler } from "@sveltejs/kit";
import { encodeFormBody } from "$lib/_includes/util";
import fs from 'fs';
import path from 'path';

const textToSpeech = async (body:any) => {
  const baseURL = 'http://127.0.0.1:50021';

  const audio = await fetch(`${baseURL}/audio_query?${encodeFormBody(body)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: ''
  }).then(res => res.json());

  const synth = await fetch(`${baseURL}/synthesis?${encodeFormBody({speaker: body.speaker, enable_interrogative_upspeak:true})}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'audio/wav'
    },
    body: JSON.stringify(audio)
  });

  return synth
};



export const POST: RequestHandler = async({request}) => {
  const body = await request.json();
  const result = await textToSpeech(body);
  const arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const file = Math.random().toString(36).substring(7);

  fs.writeFile(path.join("static", "audio", `${file}-jp.wav`), buffer, () => {
    console.log('file written wav');
  });

  return new Response(JSON.stringify({ file:`${file}-jp.wav` }), {
    status: 201,
  })
};