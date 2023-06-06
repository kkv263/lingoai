<script lang="ts">
	import { fade, fly } from 'svelte/transition';
  import LanguageIcon from '$lib/assets/LanguageIcon.svelte';
  import AudioIcon from '$lib/assets/AudioIcon.svelte';
  import { enhance, type SubmitFunction } from '$app/forms';
  import { isJapanese } from 'wanakana';

	export let sender_id:number;
	export let content:string;
	export let content_target_lang:string;
	export let content_source_lang:string;
	export let created_at:string;
  export let id:string;
  export let i:number;
  let activeTab:number = 0
	let audio:any;

  let translateLoading = -1;

  const udpateTranslation:SubmitFunction = () => {
		return async ({ update }) => {
			update({reset:false});
			translateLoading = -1;
			activeTab = activeTab !== 0 ? 0 : 1;
		}
	}

  const translateTab = async(index:number) => {
		if (!content_target_lang || !content_source_lang) {
			translateLoading = index;
		}
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
  
</script>

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
      <input id="transTranslated" name="transTranslated" type="text" hidden value={!content_source_lang || !content_target_lang} />
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
    <span class:message__item--active="{activeTab === 0}" class="message__original message__item">
      {#if content}{content}{/if}
    </span>
    <span class:message__item--active="{activeTab === 1}" class="message__translated message__item">
      {#if isJapanese(content) && content_source_lang}
				{content_source_lang}
			{:else if !isJapanese(content) && content_target_lang}
				{content_target_lang}
			{/if}
    </span>
  </div>

	<!-- {#if audio} -->
		<!-- <audio autoPlay controls>
			<source src='{`audio/wgu3sq-jp.wav`}' type='audio/wav' />
		</audio>  -->
	<!-- {/if} -->
  <span class="message__time">{new Date(created_at).toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" })}</span>
</li>

<style lang="scss">
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
		text-align: left;
		max-width: 320px;
		display: flex;
		justify-content: center;

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