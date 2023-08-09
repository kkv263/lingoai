<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	$: {
		const redirectTo = $page.url.searchParams.get('redirect');

		// check if user has been set in session store then redirect
		if (browser && data.session) {
			goto(redirectTo ?? '/home');
		}
	}
</script>

<section>
	<div class="loading">
		<div class="loading__text">loading...</div>
		<div class="loading__wrapper">
			<div class="circle"></div>
			<div class="circle"></div>
			<div class="circle"></div>
			<div class="shadow"></div>
			<div class="shadow"></div>
			<div class="shadow"></div>
		</div>
	</div>
	
</section>

<style lang="scss">
	.loading {
		background-color: #FFA16A;
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.loading__text {
		color: #fff;
		padding-bottom: 16px;
		font-size: 40px;
		font-family: 'Nunito';
		font-weight: bold;
	}

	.loading__wrapper {
		width: 200px;
		height: 60px;
		position: relative;
		z-index: 1;
	}

	.circle {
		width: 20px;
		height: 20px;
		position: absolute;
		border-radius: 50%;
		background-color: #fff;
		left: 15%;
		transform-origin: 50%;
		animation: circle7124 .5s alternate infinite ease;
	}

	@keyframes circle7124 {
		0% {
			top: 60px;
			height: 5px;
			border-radius: 50px 50px 25px 25px;
			transform: scaleX(1.7);
		}

		40% {
			height: 20px;
			border-radius: 50%;
			transform: scaleX(1);
		}

		100% {
			top: 0%;
		}
	}

	.circle:nth-child(2) {
		left: 45%;
		animation-delay: .2s;
	}

	.circle:nth-child(3) {
		left: auto;
		right: 15%;
		animation-delay: .3s;
	}

	.shadow {
		width: 20px;
		height: 4px;
		border-radius: 50%;
		background-color: rgba(#fff,1);
		position: absolute;
		top: 62px;
		transform-origin: 50%;
		z-index: -1;
		left: 15%;
		animation: shadow .5s alternate infinite ease;
	}

	@keyframes shadow {
		0% {
			transform: scaleX(1.5);
		}

		40% {
			transform: scaleX(1);
			opacity: .7;
		}

		100% {
			transform: scaleX(.2);
			opacity: .4;
		}
	}

	.shadow:nth-child(4) {
		left: 45%;
		animation-delay: .2s
	}

	.shadow:nth-child(5) {
		left: auto;
		right: 15%;
		animation-delay: .3s;
	}
</style>