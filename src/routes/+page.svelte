<script lang="ts">
	import { goto } from '$app/navigation';
  import Hero from '$lib/components/landing/Hero.svelte';
  import Learning from '$lib/components/landing/Learning.svelte';

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

<Hero />
<Learning />
<button on:click={signUp} >Sign Up </button>
<button on:click={signInWithEmail} >Sign in </button>

<style lang="scss">
</style>