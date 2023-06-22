<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { enhance, type SubmitFunction } from '$app/forms';
  import PlusCircle from "$lib/assets/PlusCircle.svelte";
  import ArrowRight from "$lib/assets/ArrowRight.svelte";
  import Cog from "$lib/assets/Cog.svelte";
  import Close from "$lib/assets/Close.svelte";
  import { clickOutside } from '$lib/_includes/util';

  export let username:string = "";
	export let display_name:string = "";
	export let avatar_url:string = "";
  let loading:boolean;
  let settingsModal:HTMLDialogElement;

  const dispatch = createEventDispatcher();

  // TODO: Add settings functionality
  // TODO: close settings menu on outside click.

  // let loading:boolean;
  let collapsed:boolean = false;
  let menu_open:boolean = false;
  let mobile_menu_open:boolean = false;

  const drawerItems = [
    {
      icon: PlusCircle,
      text: 'New Chat',
    },
  ]

  const toggleCollapse = () => {
    collapsed = !collapsed

    dispatch('collapse', {
			collapsed: collapsed
		});
  }

  const toggleMenu = () => {
    menu_open = !menu_open
  }

  const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		}
	}


  const handleOutsideClickSettings = () => {
    menu_open = false;
  }

  const toggleSettingsModal = () => {
    if (settingsModal.hasAttribute('open')) {
      settingsModal.close();
    }
    else {
      settingsModal.show();
    }
  }

  export const toggleMobileMenu = () => {
    mobile_menu_open = !mobile_menu_open;
  }

</script>
<dialog class="settings__modal" bind:this={settingsModal}>
  <div class="settings__modal-inner" >
    <header>
      <div>Settings</div>
      <button on:click={toggleSettingsModal}>
        <Close width="20px" height="20px"/>
      </button>
    </header>
  </div>
  <div class="settings__modal-backdrop"></div>
</dialog>
<aside class="sidedrawer" tabindex="-1" aria-labelledby="sidedrawer-label" class:mobile_menu_open>
  <button type="button" class="sidedrawer__overlay" on:click={toggleMobileMenu}></button>
  <section class="sidedrawer__inner" class:collapsed>
    <div class="sidedrawer__content">
      <header class="profile">
        <div class="profile-img">
          <img src={avatar_url} alt="">
        </div>
        <div class="profile-wrapper">
          <div class="profile-wrapper--top">
            <h3>{display_name}</h3>
            <div class="settings" use:clickOutside={handleOutsideClickSettings}>
              <div class="settings__buttons">
                <button on:click={toggleMenu}>
                  <Cog width="20px" height="20px"/>
                </button>
                <button class="settings__close" on:click={toggleMobileMenu}>
                  <Close width="20px" height="20px"/>
                </button>
              </div>
              <div class="settings__menu" class:menu_open>
                <ul>
                  <li><button class="button block" on:click={toggleSettingsModal} disabled={loading}>Settings</button></li>
                  <li>
                    <form method="post" action="?/signout" use:enhance={handleSignOut}>
                      <button type="submit" class="button block" disabled={loading}>Sign Out</button>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span>@{username}</span>
        </div>
      </header>
      <ul>
        <!-- TODO: Add back items later -->
        <!-- {#each drawerItems as {icon, text} }
          <li data-label={text}>
            <button type="button">
              <div class="icon-wrapper">
                <svelte:component this={icon} width="24px" height="24px"/>
              </div>
              <span>{text}</span>
            </button>
          </li>
        {/each} -->

        <!-- TODO: Remove functionality for mobile, add back later -->
        <!-- <li data-label="Expand" class="resize">
          <button type="button" on:click={toggleCollapse}>
            <div class="icon-wrapper">
              <ArrowRight width="24px" height="24px"/>
            </div>
            <span>Collapse</span>
          </button>
        </li> -->
      </ul>
    </div>
  </section>
</aside>

<style lang="scss">
  .settings__modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    border: 0;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .settings__modal-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #333;
    color: #fff;
    padding: 16px;
    min-width: 320px;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .settings__modal-backdrop {
    background-color: rgba(#000, 0.5);
    width: 100%;
    height: 100%;
  }

  .sidedrawer {
    position: fixed;
    height: 100%;
    z-index: 2;
    top: 0;
    left: 0;

    &.mobile_menu_open {
      width: 100%;
      .sidedrawer__inner {
        width: 360px;
        padding: 16px 8px;
      }
    }

    &__inner {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #111;
      padding: 16px 8px;
      width: 360px;
      height: 100%;
      transition: all .3s ease;

      @media (max-width: 1023px) {
        width: 0;
        padding: 0;
        overflow: hidden;
      }
    }

    &__content {
      height: calc( 100% - 32px);
      display: flex;
      flex-direction: column;
    }
  }

  .sidedrawer__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(2px);
    cursor: auto;

    @media (min-width: 1024px) {
      display: none;
    }
  }

  .profile {
    padding-bottom: 32px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .profile-img {
    max-width: 48px;
    height: 48px;
    border-radius: 8px;
    background-color: plum;
    flex: 1 0 64px;
    position: relative;
    cursor: pointer;

    &:hover,
    &:focus {
      &:after {
        opacity: .65;
        visibility: visible;
      }
    }

    &:after {
      border-radius: 8px;
      transition: all .3s ease;
      opacity: 0;
      visibility: hidden;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23fff' class='w-5 h-5'%3E%3Cpath fill-rule='evenodd' d='M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z' clip-rule='evenodd' /%3E%3C/svg%3E%0A");
      background-size: 24px;
      background-repeat: no-repeat;
      background-position: center;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      background-color: #000;
      width: 100%;
      height: 100%;
      z-index: 1;
      color: #fff;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      font-weight: bold;
    }
  }

  .settings {
     position: relative;

    button {
      padding: 8px;
      transition: all .3s ease;
      &:hover,
      &:focus {
        background-color: lighten(#333, 10);
      } 
    }
  }

  .settings__buttons {
    display: flex;
  }

  .settings__close {
    @media (min-width: 1024px) {
      display: none;
    }
  }

  .settings__menu {
    background-color: #333;
    position: absolute;
    right: 0;
    top: 100%;
    min-width: 120px;
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease;
    
    &.menu_open {
      opacity: 1;
      visibility: visible;
    }
    
    ul {
      padding-left: 0;
      list-style: none;

      li {
        padding:0;
        margin-bottom: 0;

        button {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .profile-wrapper {
    color: #fff;
    opacity: 1;
    transition: all .3s ease;
    width: 100%;

    &--top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    h3 {
      color: #fff;
      padding: 4px;
    }
    span {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px;
      line-height: 1;
      font-size: 14px;
      transition: all .3s ease;
    }
  }

  ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    list-style: none;
    margin: 0;
  }

  li {
    padding: 8px 12px;
    cursor: pointer;
    transition: all .3s ease;
    position: relative;

    &:after {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: calc(100% + 4px);
      content: attr(data-label);
      color: #fff;
      white-space: nowrap;
      background-color: #000;
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 12px;
      transition: all .3s ease;
      opacity: 0;
      visibility: hidden;
    }

    &:hover,
    &:focus {
      background-color: lighten(#333, 10);
    }

    span {
      white-space: nowrap;
      opacity: 1;
      transition: all .3s ease;
    }
    
    &[data-label="Expand"] {
      @media (max-width: 1023px) {
        display: none;
      }
    }
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    flex: 1 0 24px;
    max-width: 24px;
  }

  .resize {
    margin-top: auto;
    .icon-wrapper {
      transition: all .3s ease;
      transform: rotate(-180deg);
    }
  }

  button {
    background-color: transparent;
    border: 0;
    padding: 0;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    cursor: pointer;
    span {
      line-height: 1;
    }
  }

  .collapsed {
    width: 64px;
    .profile-wrapper {
      opacity: 0;
    }
    li {

      &:hover,
        &:focus {
          &:after {
            opacity: 1;
            visibility: visible;
          }
        }
      span {
        opacity: 0;
      }
    }
    .icon-wrapper {
      transform: rotate(0deg);
    } 
  }
</style>