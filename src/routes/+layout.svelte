<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>LingoAI</title>
</svelte:head>

<main class="main">
	<slot />
</main>

<style lang="scss" global>
	@import '../styles/normalize.css';
	@import '../styles/reset.css';
	@import '../styles/style.scss';
</style>