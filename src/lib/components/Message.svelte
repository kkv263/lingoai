<script lang="ts">
	import { fade, fly } from 'svelte/transition';
  import LanguageIcon from '$lib/assets/LanguageIcon.svelte';
  import AudioIcon from '$lib/assets/AudioIcon.svelte';
  import { enhance, type SubmitFunction } from '$app/forms';
  import { isJapanese } from 'wanakana';
  import PlayCircle from '$lib/assets/PlayCircle.svelte';
  import PauseCircle from '$lib/assets/PauseCircle.svelte';
	import { convertTimestampsToLocale } from '$lib/_includes/util';

	export let sender_id:string;
	export let userid:string;
	export let content:string;
	export let content_target_lang:string;
	export let content_source_lang:string;
	export let created_at:string;
  export let id:string;
  export let i:number;
  let activeTab:number = 0
	let audio:any;
	let canvas:HTMLCanvasElement;
	let audioElement:HTMLAudioElement;
	let isAudioPlaying:boolean = false;
	let isAudioLoading:boolean = false;
	let isJapaneseContent = isJapanese(content);
	let isAudioDisabled = (!isJapanese(content) && activeTab == 0) ||  (isJapanese(content) && activeTab == 1);

  let translateLoading = -1;

  const udpateTranslation:SubmitFunction = () => {
		return async ({ update }) => {
			update({reset:false});
			translateLoading = -1;
			activeTab = activeTab !== 0 ? 0 : 1;
			isAudioDisabled = (!isJapanese(content) && activeTab == 0) ||  (isJapanese(content) && activeTab == 1);
		}
	}

  const translateTab = async(index:number) => {
		if (!content_target_lang || !content_source_lang) {
			translateLoading = index;
		}
		isAudioPlaying = false;
		audioElement.pause();
		audioElement.currentTime = 0;
	}

	const japaneseAudio = async(val:string, sender_id:string) => {
		isAudioLoading = true;

		if (audio) {
			audioElement.currentTime = 0;
			audioElement.play();
			return
		}

    try {
			await fetch('/api/v1/tts/jp', {
				method: 'POST',
				body: JSON.stringify({
					'text': val,
          'speaker': 47,
				})
			}).then((res) => res.json()).then((data) => {
        audio = data.file;
				// isAudioLoading = false;
				audioElement.src = `audio/${audio}`;
				audioElement.load();
				audioElement.play();

				audioElement.addEventListener('ended', () => {
					isAudioPlaying = false;
				});

				audioElement.addEventListener('pause', () => {
					isAudioPlaying = false;
				});

				audioElement.addEventListener('playing', () => {
					isAudioPlaying = true;
				});


				const context = new AudioContext();
				const src = context.createMediaElementSource(audioElement);
				const analyser = context.createAnalyser();
				const ctx = canvas.getContext("2d")!;

				src.connect(analyser);
    		analyser.connect(context.destination);

				analyser.fftSize = 256;

				const bufferLength = analyser.frequencyBinCount;

				const dataArray = new Uint8Array(bufferLength);
				const {width, height} = canvas;

				const barWidth = (width / bufferLength) * 2.5;
				let barHeight;
				let x = 0;

				const renderFrame = () => {
					requestAnimationFrame(renderFrame);

					x = 0;

					analyser.getByteFrequencyData(dataArray);

					ctx.fillStyle = sender_id === userid ? "#347FC4" : "#FFA16A";
					ctx.fillRect(0, 0, width, height);

					for (var i = 0; i < bufferLength; i++) {
						barHeight = dataArray[i] / 1.5;
						ctx.fillStyle = "#fff";
						ctx.fillRect(x, height - barHeight, barWidth, barHeight);

						x += barWidth + 1;
					}
				}

				renderFrame();

      });
		}
		catch (error) {
			console.error(error);
		}
  }

	const toggleAudio = () => {
		if (!audioElement.paused) {
			audioElement.pause()
		}
		else {
			audioElement.play()
		}
	}
  
</script>

<li class={`message__msg message__msg--${sender_id != userid ? 'left' : 'right'}`} in:fly="{{ y: 50, duration: 500 }}" out:fade>
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
      <button disabled={isAudioDisabled} on:click={() => japaneseAudio(content_target_lang, sender_id)} title="Listen in Japanese" type="button"><AudioIcon width={'16px'} height={'16px'}/></button>
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
      {#if isJapaneseContent && content_source_lang}
				{content_source_lang}
			{:else if !isJapaneseContent && content_target_lang}
				{content_target_lang}
			{/if}
    </span>
		<div class={`audio-player ${isAudioLoading ? 'audio-player--active' : ''}`} class:isAudioPlaying class:isAudioDisabled>
			<div class="audio-player__top">
				<div class="audio-player__buttons">
					<button type="button" on:click={toggleAudio}>
						<PlayCircle width={'24px'} height={'24px'} />
					</button>
					<button type="button" on:click={toggleAudio}>
						<PauseCircle width={'24px'} height={'24px'} />
					</button>
				</div>
				<div class={`audio-player__canvas ${!audio ? 'audio-player__canvas--loading' : ''}`}>
					<span>Loading Audio...</span>
  				<canvas bind:this={canvas}></canvas>
				</div>
			</div>
			<!-- <div class="audio-player__time">
				<span>0:00</span>
				<span> / </span>
				<span>0:00</span>
			</div> -->
		</div>
  </div>
	<audio autoPlay controls bind:this={audioElement}>
		<source type='audio/wav' />
	</audio> 
  <span class="message__time">{convertTimestampsToLocale(created_at)}</span>
</li>

<style lang="scss">
	.audio-player {
		display: none;
		flex-direction: column;
		margin-top: 4px;

		&.isAudioDisabled {
			display: none;
		}

		&.isAudioPlaying {
			.audio-player__buttons {
				button:first-child {
					display: none;
				}

				button:last-child {
					display: block;
				}
			}
		}

		&--active {
			display: flex;
		}
	}

	audio {
		display: none;
	}

	.audio-player__canvas {
		width: 100%;
		span {
			display: none;
		}

		&--loading {
			span {
				display: block;
			}
			canvas {
				display: none;
			}
		}
	}

	.audio-player__buttons {
		padding-right: 8px;
		button {
			cursor: pointer;
			background-color: transparent;
			border: 0;
			padding: 0;
			color: #fff;
			height: 24px;
			width: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all .3s ease;

			&:last-child {
				display: none;
			}
		}
	}

	.audio-player__top {
		display: flex;
		align-items: center;
		border: 1px solid #fff;
		border-radius: 8px;
		padding: 4px 8px;
	}

	.audio-player__time {
		display: flex;
		justify-content: flex-end;
		font-size: 12px;
	}

	canvas {
		height: 24px;
		width: 100%;
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
				background-color: #FFA16A;
				border-top-left-radius: 0;
			}

			.message__options {
				background-color: #FFA16A;
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

			&[disabled] {
				pointer-events: none;
				opacity: 0.5;
				position: relative;

				&:after {
					position: absolute;
					content: '';
					width: 90%;
					height: 1px;
					top: 50%;
					left: 0;
					transform: translateY(-50%) rotate(-45deg);
					background-color: #fff;
					display: block;
				}
			}

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
		flex-direction: column;

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