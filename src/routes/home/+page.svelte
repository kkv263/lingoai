<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
 	import SendIcon from '$lib/assets/SendIcon.svelte';
  import LanguageIcon from '$lib/assets/LanguageIcon.svelte';
  import AudioIcon from '$lib/assets/AudioIcon.svelte';

	export let data;
	export let form;

  let audio:any;
	let loading = false;
	let translateLoading = -1;
	let messagesContainer: HTMLDivElement;
	let messagesActiveTabs = [ ...Array(data.messages?.length).keys() ].map( i => 0);

	onMount(() => {
		scrollToBottom();
	})

	const scrollToBottom = () => {
		messagesContainer.scroll({
			top: messagesContainer.scrollHeight,
			behavior: 'smooth',
		});
	}

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
			update();
			loading = false;
			messagesActiveTabs = [...messagesActiveTabs, 0];
			// TODO: Find a better way to scroll to bottom after message is sent
			setTimeout(() => {
				scrollToBottom();
			}, 500);
		}
	}

	const udpateTranslation:SubmitFunction = () => {
		return async ({ update }) => {
			update({reset:false});
			translateLoading = -1;
		}
	}

	const translateTab = async(index:number) => {
		if (!data.messages) { return ;}
		const currentMsg = data.messages[index]

		if (!currentMsg.translated_content) {
			translateLoading = index;
		}

		messagesActiveTabs[index] = messagesActiveTabs[index] !== 0 ? 0 : 1;
	}

</script>

<div class="">
  <h1>homepage</h1>
  <div>You are signed in</div> 

	<div>{JSON.stringify(form)}</div>

	<div class="messages__container"
	bind:this={messagesContainer}>
		<ul class="messages__list" >
			{#if data.messages}
				{#each data.messages as {sender_id, content, translated_content, created_at, id }, i (id)}
						<li class={`message__msg message__msg--${sender_id != 0 ? 'left' : 'right'}`} in:fly="{{ y: 50, duration: 500 }}" out:fade>
							<span class="message__options">
								<form 
									method="post"
									action="?/updatetranslation"
									use:enhance={udpateTranslation}
									on:submit|preventDefault={() => translateTab(i)}
								>
									<button title="Translate Text" type="submit"><LanguageIcon width={'16px'} height={'16px'}/></button>
									<input id="transId" name="transId" type="text" hidden value={id} />
									<input id="transContent" name="transContent" type="text" hidden value={content} />
									<input id="transTranslated" name="transTranslated" type="text" hidden value={translated_content} />
								</form>
								<form action="">
									<button title="Listen in Japanese" type="button"><AudioIcon width={'16px'} height={'16px'}/></button>
								</form>
							</span>
							<div class:message__content--loading="{translateLoading === i}" class="message__content">
								<div class="message__loading">
									<span></span>
									<span></span>
									<span></span>
								</div>
								<span class:message__item--active="{messagesActiveTabs[i] === 0}" class="message__original message__item">{content}</span>
								<span class:message__item--active="{messagesActiveTabs[i] === 1}" class="message__translated message__item">
									{#if translated_content}{translated_content}{/if}
								</span>
							</div>
							<span class="message__time">{new Date(created_at).toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" })}</span>
						</li>
				{/each}
			{/if}
		</ul>
		<form class="message__input-container"
			method="post"
			action="?/send"
			use:enhance={handleSubmit}>
			<input id="msg" name="msg" class="message__input" on:focus={scrollToBottom}>
			<button class="message__send" type="submit" title="Send Message">
				<span>Send</span>
				<SendIcon width={'24px'} height={'24px'}/>
			</button>
		</form>
	</div>

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

		button {
			border: 0;
			background: transparent;
			border-radius: 100%;
			transition: all .3s ease;
			padding: 4px;
			cursor: pointer;
			color: #fff;

			&:not(:last-child) {
				margin-right: 8px;
			}

			&:hover {
				background: #fff;
				border-radius: 100%;

				&:global svg { 
					stroke: #222;
					transition: all .3s ease;
				}
			}
		}
	}

	.message__time {
		opacity: 0.5;
		font-size: 14px;
	}

	.message__loading {
		display: none;
	}

	.message__content {
		background-color: #347FC4;
		border-radius: 12px;
		padding: 16px;
		min-width: 84px;
		min-height: 54px;
		text-align: center;

		&--loading {
			.message__loading {
				display: flex;
				align-items: center;
				justify-content: center;
				span {
					display: block;
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: #fff;
					margin: 5px 4px;
					animation: typing 1000ms ease-in-out infinite;
    			animation-delay: 3600ms;

					&:nth-child(1) {
						animation-delay: 0ms;
					}
						
					&:nth-child(2) {
						animation-delay: 333ms;
					}
						
					&:nth-child(3) {
						animation-delay: 666ms;
					}
				}
			}
			.message__item {
				display: none;
			}
		}
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
		padding: 8px 120px 8px 16px;
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
				opacity: .8;
    	}
		}
	}

	.message__item {
		display: none;

		&--active {
			display: block;
		}
	}
	@keyframes typing {
		0% {scale:1;}
		33% {scale:1;}
		50% {scale:1.4;}
		100% {scale:1;}
	}

</style>