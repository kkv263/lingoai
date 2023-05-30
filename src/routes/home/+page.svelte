<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { fade, fly } from 'svelte/transition';
 	import SendIcon from '$lib/assets/SendIcon.svelte';
  import LanguageIcon from '$lib/assets/LanguageIcon.svelte';
    import AudioIcon from '$lib/assets/AudioIcon.svelte';

	export let data;

	let inputValue:string = ''; // or hsv or hex
  let translatedValue:string = '';
  let audio:any;

	const translateValue = async() => {
		// try {
		// 	await fetch('/api/v1/translate', {
		// 		method: 'POST',
		// 		body: JSON.stringify({
		// 			text: inputValue
		// 		})
		// 	}).then((res) => res.json()).then((data) => {
    //     translatedValue = data.text;
    //   });
		// }
		// catch (error) {
		// 	console.error(error);
		// }

    // if (translatedValue) {
    //   japaneseAudio(translatedValue);
    // }
	};

	const japaneseAudio = async(val:string) => {
    try {
			await fetch('/api/v1/tts/jp', {
				method: 'POST',
				body: JSON.stringify({
					'text': val,
          'speaker': 47,
				})
			}).then((res) => res.json()).then((data) => {
        audio = data.file;
      });
		}
		catch (error) {
			console.error(error);
		}
  }

	let loading = false;
	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		}
	}

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
			inputValue = ''
		}
	}

	const scrollToBottom = (node: HTMLFormElement, messages:any) => {
		const scroll = () => node.scroll({
			top: node.scrollHeight,
			behavior: 'smooth',
		});
		scroll();

		return { update: scroll }
	};

</script>

<div class="">
  <h1>homepage</h1>
  <div>You are signed in</div>

	<form class="messages__container"
	method="post"
	action="?/send"
	use:enhance={handleSubmit}
	use:scrollToBottom={data.messages}>
		<ul class="messages__list" >
			{#if data.messages}
				{#each data.messages as message (message.id)}
						<li class={`message__msg message__msg--${message.sender_id != 0 ? 'left' : 'right'}`} in:fly="{{ y: 50, duration: 500 }}" out:fade>
							<span class="message__options">
								<LanguageIcon width={'24px'} height={'24px'}/>
								<AudioIcon width={'24px'} height={'24px'}/>
							</span>
							<span class="message__content">{message.content}</span>
							<span class="message__translated">{message.translated_content}</span>
							<span class="message__time">{new Date(message.created_at).toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" })}</span>
						</li>
				{/each}
			{/if}
		</ul>
		<div class="message__input-container">
			<input id="msg" name="msg" class="message__input" bind:value={inputValue}>
			<button class="message__send" type="submit" title="Send Message">
				<span>Send</span>
				<SendIcon width={'24px'} height={'24px'}/>
			</button>
		</div>
	</form>

	{#if audio}
		<audio autoPlay controls>
			<source src='{`audio/${audio}`}' type='audio/wav' />
		</audio> 
	{/if}

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button class="button block" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>

<style lang="scss">
	.messages__container {
		max-width: 768px;
		margin: 0 auto;
		width: 100%;
		background-color: #222;
		height: 480px;
		overflow: auto;
		position: relative;
	}
	
	.messages__list {
		list-style: none;
		color: #fff;
		padding-left: 0;
		display: flex;
		flex-direction: column;
		padding: 32px 32px 16px;
	}

	.message__msg {
		padding-bottom: 16px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		font-size: 14px;
		position: relative;

		&:hover {
			.message__options {
				opacity: 1;
				bottom: calc(100% + 1px);
			}
		}

		&--left {
			align-self: flex-start;
			.message__content {
				background-color: #B785F5;
				border-top-left-radius: 0;
			}

			.message__options {
				background-color: #B785F5;
				left: 0;
			}
		}

		&--right {
			align-self: flex-end;
			.message__content {
				border-top-right-radius: 0;
			}

			.message__options {
				right: 0;
				background-color: #347FC4;
			}
		}
	}

	.message__options {
		display: flex;
		position: absolute;
		bottom: calc(100% - 4px);
		border-radius: 12px;
		padding: 4px 8px;
		opacity: 0;
		transition: all .3s ease;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		&:global svg { 
			cursor: pointer;
			transition: all .3s ease;
			padding: 4px;

			&:hover {
				background: #fff;
				stroke: #222;
				border-radius: 100%;
			}

			&:not(:last-child) {
				margin-right: 8px;
			}
		}
	}

	.message__time {
		opacity: 0.5;
		font-size: 14px;
	}

	.message__content {
		background-color: #347FC4;
		border-radius: 12px;
		padding: 16px;
	}

	.message__input-container {
		position: sticky;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px 32px;
		background-image: linear-gradient(to top, #222 40%, transparent 100%);
	}

	.message__input {
		width: 100%;
		background-color: #16171B;
		border: 0;
		padding: 8px 64px 8px 16px;
		min-height: 48px;
		border-radius: 12px;
		color: #fff;
	}
	
	.message__send {
		position: absolute;
		right: 48px;
		top: 50%;
		transform: translateY(-50%);
		border: 0;
		background-color: #F3FC89;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		height: 32px;
		cursor: pointer;
		transition: all .3s ease;
		overflow: hidden;
		width: 88px;
		padding: 0 8px;

		span {
			padding-right: 8px;
			transition: all .3s ease;
		}

		&:hover {
			background-color: lighten(#F3FC89, 20%);

			span {
				transform: translateX(-100%);
			}

			&:global svg {
				transform: translateX(-20px);
				// animation: tilt-shaking .3s linear infinite;
				opacity: .8;
    	}
		}
	}

	@keyframes tilt-shaking {
		0% { transform: rotate(0deg); }
		25% { transform: rotate(5deg); }
		50% { transform: rotate(0eg); }
		75% { transform: rotate(-5deg); }
		100% { transform: rotate(0deg); }
	}
</style>