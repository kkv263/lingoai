<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from 'svelte';
  // import { supabase } from "$lib/_includes/supabaseClient";
  // import { onMount } from "svelte";
  // import { user } from "$lib/stores/sessionStore";
  // import { actionModalState } from "$lib/stores/actionModalStore";
  import PlusCircle from "$lib/assets/PlusCircle.svelte";
  import ArrowRight from "$lib/assets/ArrowRight.svelte";
  // import Cog from "$lib/components/icons/Cog.svelte";
  // import PencilSquare from "$lib/components/icons/PencilSquare.svelte";

  const dispatch = createEventDispatcher();

  // let loading:boolean;
  let collapsed:boolean = false;
  // let displayName:string;

  const drawerItems = [
    {
      icon: PlusCircle,
      text: 'New Chat',
    },
  ]

  // onMount(() => {
  //   getProfile();
  // })


  // const getProfile = async () => {
  //   try {
  //     loading = true;
  //     const user = supabase.auth.user();
  //     let { data, error, status } = await supabase
  //       .from("profiles")
  //       .select(`username, display_name`)
  //       .eq("id", user?.id)
  //       .single();

  //     if (error && status !== 406) throw error;
  //     if (data) {
  //       displayName = data.display_name;
  //     }

  //   } catch (error: any) {
  //     alert(error.message);
  //   } finally {
  //     loading = false;
  //   }
  // };

  const toggleCollapse = () => {
    collapsed = !collapsed

    dispatch('collapse', {
			collapsed: collapsed
		});
  }

  // const toggleActionModal = (modalstate:string) => {
  //   $actionModalState = modalstate;
  // }


</script>
<aside class="sidedrawer" tabindex="-1" role="dialog" aria-labelledby="sidedrawer-label" aria-modal="true" in:fade={{duration: 250}} out:fade={{duration:400}}>
  <section class="sidedrawer__inner" class:collapsed>
    <div class="sidedrawer__content">
      <header class="profile">
        <div class="profile-img">
          <img src="" alt="">
        </div>
        <div class="profile-wrapper">
          <h3>username</h3>
          <span>settings</span>
        </div>
      </header>
      <ul>
        {#each drawerItems as {icon, text} }
          <li data-label={text}>
            <button type="button">
              <div  class="icon-wrapper">
                <svelte:component this={icon} width="24px" height="24px"/>
              </div>
              <span>{text}</span>
            </button>
          </li>
        {/each}

        <li data-label="Expand" class="resize">
          <button type="button" on:click={toggleCollapse}>
            <div class="icon-wrapper">
              <ArrowRight width="24px" height="24px"/>
            </div>
            <span>Collapse</span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</aside>

<style lang="scss">
  // @import "../../../styles/vars";
  // @import "../../../styles/breakpoints";

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

  .profile-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    color: #fff;
    opacity: 1;
    transition: all .3s ease;
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
      cursor: pointer;
      transition: all .3s ease;
      &:hover,
      &:focus {
        background-color: lighten(#333, 10);
      }
    }
  }

  ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    gap: 16px;
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
      // transition: $transition;
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

  .sidedrawer {
    position: fixed;
    height: 100%;
    z-index: 2;
    top: 0;
    left: 0;

    &__inner {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #111;
      padding: 16px 8px;
      width: 208px;
      height: 100%;
      transition: all .3s ease;
    }

    &__content {
      height: calc( 100% - 32px);
      display: flex;
      flex-direction: column;
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