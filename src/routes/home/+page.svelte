<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { onMount } from 'svelte';
 	import SendIcon from '$lib/assets/SendIcon.svelte';
	import { tokenize } from 'wanakana';
  import Message from '$lib/components/Message.svelte';
	import SideDrawer from '$lib/components/SideDrawer.svelte';
	import Menu from '$lib/assets/Menu.svelte';

	export let data;

  let audio:any;
	let loading = false;
	let messagesContainer: HTMLDivElement;
	let chatContainer: HTMLDivElement;
	let messagesInput: HTMLInputElement;
	let speakerName: string = ' うちは サスケ';
	let child:any;

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
		return async ({ update }) => {
			update();
			loading = false;
			// TODO: Find a better way to scroll to bottom after message is sent
			setTimeout(() => {
				scrollToBottom();
			}, 500);
		}
	}

	const handleCollapse = (event:any) => {
		chatContainer.setAttribute('data-collapsed', event.detail.collapsed);
	}

	const toggleMenu = () => {
		child.tester();
	}
</script>

<div class="">
  <!-- <h1>homepage</h1>
  <div>You are signed in</div>  -->
<!-- 
	<div>{JSON.stringify(tokenize('アメリカから来た友達こんにちは', { detailed: true }))}</div> -->
	<SideDrawer on:collapse={handleCollapse} {...data.profiles} bind:this={child}/>
	<div class="chat__container" bind:this={chatContainer} data-collapsed="false">
		<div class="messages__container" bind:this={messagesContainer}>
			<div class="chat__top">
				<button on:click={toggleMenu} type="button" class="chat__menu"><Menu width={'24px'} height={'24px'}/></button>
				<div>Chatting with: {speakerName}</div>
			</div>
			<ul class="messages__list" >
				{#if data.messages}
					{#each data.messages as message, i }
						<Message {...message} i={i}/>
					{/each}
				{/if}
			</ul>
			<form class="message__input-container"
				method="post"
				action="?/send"
				use:enhance={handleSubmit}>
				<input id="msg" name="msg" class="message__input" on:focus={scrollToBottom} bind:this={messagesInput}>
				<button class="message__send" type="submit" title="Send Message">
					<span>Send</span>
					<SendIcon width={'24px'} height={'24px'}/>
				</button>
			</form>
		</div>
	</div>
</div>

<style lang="scss">
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
		list-style: none;
		color: #fff;
		padding-left: 0;
		display: flex;
		flex-direction: column;
		padding: 32px 32px 16px;
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

</style>