<script lang="ts">
	import { goto } from '$app/navigation';
  import Email from '$lib/components/landing/Email.svelte';
  import Hero from '$lib/components/landing/Hero.svelte';
  import Learning from '$lib/components/landing/Learning.svelte';
	import LingoIcon from '$lib/assets/LingoIcon.svelte';

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

	// const signInWithEmail = async () => {
	// 	const { data, error } = await supabase.auth.signInWithPassword({
	// 		email: 'sprantmaster@gmail.com',
	// 		password: 'password',
	// 	});

	// 	goto('/logging-in');
	// }

	// const signUp = async () => {
	// 	const { error } = await supabase.auth.signUp({
	// 		email: 'sprantmaster@gmail.com',
	// 		password: 'password',
	// 	})
  // }

	export let data;
</script>

<nav>
	<div class="container">
		<a href="/">
			<LingoIcon width={'24px'} height={'24px'}/>
			<div class="nav__text">
				<span>LINGO</span>
				<span>AI</span>
			</div>
		</a>
	</div>

</nav>
<Hero />
<Learning />
<Email />
<!-- <button on:click={signUp} >Sign Up </button> -->
<!-- <button on:click={signInWithEmail} >Sign in </button> -->

<style lang="scss">
	nav {
		background-color: #FC9437;
		padding: 8px 0;
	}

	a {
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.nav__text {
		color: #fff;
		font-weight: bold;
		font-family: 'Oswald';
		font-size: 20px;
		display: flex;
		align-items: flex-end;
		line-height: 1;
		margin-left: 8px;

		span:last-child {
			font-size: 14px;
		}
	}
</style>