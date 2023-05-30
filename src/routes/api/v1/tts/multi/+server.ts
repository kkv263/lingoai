
import type { RequestHandler } from "@sveltejs/kit";
import { ELEVEN_API_KEY } from '$env/static/private';

import fs from 'fs';
import path from 'path';

const textToSpeech = async (body:any) => {
  // Set the API key for ElevenLabs API. 
  // Do not use directly. Use environment variables.
  const API_KEY = ELEVEN_API_KEY;
  // Set the ID of the voice to be used.
  const VOICE_ID = 'AZnzlk1XvdvUeBnXmlld';

  return fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      accept: 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': `${API_KEY}`
    },
    body: JSON.stringify(
      {
        'text': 'hello, this is a small test',
        'model_id': "eleven_monolingual_v1",
        "voice_settings": {
          "stability": 0.5,
          "similarity_boost": 0.5
        }
      }
    )
  });
};

export const POST: RequestHandler = async({request}) => {
  const body = await request.json();
  const result = await textToSpeech(body);
  const arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const file = Math.random().toString(36).substring(7);

  fs.writeFile(path.join("static", "audio", `${file}.mp3`), buffer, () => {
    console.log('file written');
  });

  return new Response(JSON.stringify({ file:`${file}.mp3` }), {
    status: 201,
  })
};