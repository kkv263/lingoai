<script lang="ts">
	import { goto } from '$app/navigation';

	let inputValue:string = ''; // or hsv or hex
  let translatedValue:string = '';
  let audio:any;
	let email: string;
  let password: string;
  let userName: string;
  let birthdate: string;
  let displayName: string;


  // const createAudio = async() => {
  //   try {
	// 		await fetch('/api/v1/tts/multi', {
	// 			method: 'POST',
	// 			body: JSON.stringify({
	// 				'text': 'hello, this is a small test',
  //         'model_id': "eleven_monolingual_v1",
  //         "voice_settings": {
  //           "stability": 0.5,
  //           "similarity_boost": 0.5
  //         }
	// 			})
	// 		}).then((res) => res.json()).then((data) => {
  //       audio = data.file;
  //     });
	// 	}
	// 	catch (error) {
	// 		console.error(error);
	// 	}
  // }

	$: ({ supabase } = data);

	const signInWithEmail = async () => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: 'sprantmaster@gmail.com',
			password: 'password',
		});

		goto('/logging-in');
	}

	const signUp = async () => {
		const { error } = await supabase.auth.signUp({
			email: 'sprantmaster@gmail.com',
			password: 'password',
		})
  }

	export let data;
</script>

<h1>index page</h1>
<p>you are signed out</p>

<div>{translatedValue}</div>

<button on:click={signUp} >Sign Up </button>
<button on:click={signInWithEmail} >Sign in </button>

<style lang="scss">
</style>