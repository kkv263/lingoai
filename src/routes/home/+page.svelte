<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { onMount } from 'svelte';
 	import SendIcon from '$lib/assets/SendIcon.svelte';
	import { tokenize } from 'wanakana';
  import Message from '$lib/components/Message.svelte';
	import SideDrawer from '$lib/components/SideDrawer/SideDrawer.svelte';
	import Menu from '$lib/assets/Menu.svelte';
	import { activeReceiverState } from '$lib/stores/activeReceiverStore'

	export let data;

  let audio:any;
	let messagesValue: string;
	let loading = false;
	let messagesContainer: HTMLDivElement;
	let chatContainer: HTMLDivElement;
	let messagesInput: HTMLInputElement;
	let speakerName: string = `${data.lastMessages[0]?.name_en} (${data.lastMessages[0]?.name_jp})`;
	let child:any;
	let userid:string = data.profiles?.id;
	$activeReceiverState = data.lastMessages[0]?.sender_id === userid ? data.lastMessages[0]?.receiver_id : data.lastMessages[0]?.sender_id;

	onMount(() => {
		scrollToBottom();
	})

	const scrollToBottom = () => {
		messagesContainer.scroll({
			top: messagesContainer.scrollHeight,
			behavior: 'smooth',
		});
	}

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		setTimeout(() => {
			scrollToBottom();
		}, 500);
		return async ({ update }) => {
			update();
			loading = false;
			// TODO: Find a better way to scroll to bottom after message is sent
			setTimeout(() => {
				scrollToBottom();
			}, 1000);
		}
	}

	const handleCollapse = (event:any) => {
		chatContainer.setAttribute('data-collapsed', event.detail.collapsed);
	}

	const toggleMenu = () => {
		child.toggleMobileMenu();
	}
</script>

<div class="">
  <!-- <h1>homepage</h1>
  <div>You are signed in</div>  -->
<!-- 
	<div>{JSON.stringify(tokenize('アメリカから来た友達こんにちは', { detailed: true }))}</div> -->
	<SideDrawer on:collapse={handleCollapse} {...data.profiles} lastMessages={data.lastMessages} bind:this={child}/>
	<div class="chat__container" bind:this={chatContainer} data-collapsed="false">
		<div class="messages__container" bind:this={messagesContainer}>
			<div class="chat__top">
				<button on:click={toggleMenu} type="button" class="chat__menu"><Menu width={'24px'} height={'24px'}/></button>
				<div>Chatting with: {speakerName}</div>
			</div>
			<ul class="messages__list" >
				{#if data.messages}
					{#each data.messages as message, i }
						{#if message.sender_id === $activeReceiverState || message.receiver_id === $activeReceiverState}
							<Message {...message} i={i} userid={userid}/>
						{/if}
					{/each}
				{/if}

				{#if loading}
					<!-- <Message content={messagesValue} sender_id={userid} created_at={new Date().toString()} content_source_lang={""} i={0} content_target_lang={""} id={""} userid={userid}/> -->
					<li class="message__loader">
						<div class="message__loading">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</li>
				{/if}
			</ul>
			<form class="message__input-container"
				method="post"
				action="?/send"
				use:enhance={handleSubmit}>
				<input id="msg" name="msg" class="message__input" on:focus={scrollToBottom} bind:this={messagesInput} bind:value={messagesValue}>
				<input id="receiver" name="receiver" hidden value={$activeReceiverState}>
				<button class="message__send" type="submit" title="Send Message">
					<span>Send</span>
					<SendIcon width={'24px'} height={'24px'}/>
				</button>
			</form>
		</div>
	</div>
</div>

<style lang="scss">
	[hidden] {
		display: none;
	}

	.chat__container {
		margin-left: 64px;
		width: calc(100% - 64px);
		height: 100vh;
		position: relative;
		transition: all .3s ease;
		
		&[data-collapsed=false] {
			margin-left: 360px;
			width: calc(100% - 360px);
		}

		@media (max-width: 1023px) {
			&[data-collapsed=false] {
				width: 100%;
				margin-left: 0;
			}
		}
	}
	
	.chat__top {
		background-color: #000;
		min-height: 48px;
		display: flex;
		align-items: center;
		padding: 8px;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;
		justify-content: space-between;
		div {
			color: #fff;
		}
	}

	.chat__menu {
		background-color: transparent;
		border: 0;
		color: #fff;
		cursor: pointer;
		display: none;

		@media (max-width: 1023px) {
			display: block;
		}
	}
	
	.messages__container {
		margin: 0 auto;
		width: 100%;
		background-color: #222;
		height: 100vh;
		overflow: auto;
		position: relative;
	}
	
	.messages__list {
		min-height: calc(100vh - 128px);
		list-style: none;
		color: #fff;
		padding-left: 0;
		display: flex;
		flex-direction: column;
		padding: 32px 32px 16px;
	}

	.message__input-container {
		margin-top: auto;
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

	.message__loader {
		border-radius: 12px;
    padding: 16px;
    min-height: 54px;
    text-align: left;
		background-color: #999;
		border-top-left-radius: 0;
		width: 80px;
	}

	.message__loading {
				display: inline-flex;
				align-items: center;
				justify-content: flex-start;
				span {
					display: block;
					width: 10px;
					height: 10px;
					border-radius: 50%;
					opacity: .5;
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

	@keyframes typing {
		0% {scale:1;}
		33% {scale:1;}
		50% {scale:1.4;}
		100% {scale:1;}
	}
</style>