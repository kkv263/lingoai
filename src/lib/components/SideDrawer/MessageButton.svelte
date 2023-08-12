<script lang="ts">
  import { convertTimestampsToLocale } from '$lib/_includes/util';
  import { activeReceiverState } from '$lib/stores/activeReceiverStore.js'
  export let name_en:string;
  export let name_jp:string
  export let content:string;
  export let created_at:string;
  export let bot_id: string;
</script>

<li class="sender" data-id={bot_id} data-active={bot_id === $activeReceiverState}>
  <button class="sender__button" type="button" on:click={() => {$activeReceiverState = bot_id }}>
    <div class="sender__info">
      <div class="sender__name">{name_en} ({name_jp})</div>
      <div class="sender__time">{convertTimestampsToLocale(created_at)}</div>
    </div>
    <div class="msg-overflow">{content}</div>
  </button>
</li>

<style lang="scss">
  li {
    padding-bottom: 16px;
    &[data-active="true"] {
      button {
        background-color: #333;

        &:hover,
        &:focus {
          background-color: lighten(#333, 10);
        }
      }
    }
  }

  .sender__name {
    font-weight: bold;
    font-size: 16px;
  }

  .sender__time {
    font-size: 14px;
    opacity: .7;
  }

  .sender__info {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    align-items: flex-start;
  }

  .msg-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    opacity: .7;
  }

  .sender__button {
    border-radius: 8px;
    color: #fff;
    text-align: left;
    background-color: transparent;
    width: 100%;
    border: 0;
    padding: 12px 16px;
    cursor: pointer;
    transition: all .3s ease;

    &:hover,
    &:focus {
      background-color: lighten(#333, 10);
    }
  }
</style>