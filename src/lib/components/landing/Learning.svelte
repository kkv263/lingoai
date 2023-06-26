<script lang="ts">
  import AudioIcon from "$lib/assets/AudioIcon.svelte";
  import GlobeIcon from "$lib/assets/GlobeIcon.svelte";
  import LanguageIcon from "$lib/assets/LanguageIcon.svelte";

  let activeTab = 0;
  let tabPanels = [
    {
      icon: LanguageIcon,
      header: 'Translation',
      content: `Translate messages on the fly with DeepL translation, which are high quality, accurate, and most natural-sounding translations.`,
      img: 'src/lib/assets/img/translate.png',
      phoneVideo: 'src/lib/assets/img/phonetranslate.mp4',
      phoneImg: ''
    },
    {
      icon: AudioIcon,
      header: 'Audio',
      content: 'Messages are audio transcribed with unlimited playback. Listen to a natural language to immerse yourself and learn the language!',
      img: 'src/lib/assets/img/speaker.png',
      phoneVideo: 'src/lib/assets/img/phoneaudio.mp4',
      phoneImg: ''
    },
    {
      icon: GlobeIcon,
      header: 'AI Personalities',
      content: 'Choose from a different number of AI personalities to chat with! Ranging from casual to serious personalities to fit your needs.',
      img: 'src/lib/assets/img/group.png',
      phoneVideo: '',
      phoneImg: 'src/lib/assets/img/phone.png'
    },
  ];

  const toggleTab = (index: number) => {
    activeTab = index;
  }
</script>

<section class="learning">
  <div class="container">
    <div class="learning__container">
      <div class="learning__container--left">
        <h2>Learning a new language<br> has never been easier</h2>

        <div class="learning__tabs" role="tablist">
          <ul class="learning__tabs-headers">
            {#each tabPanels as {icon, header}, i}
              <li role="tab" id={"tab-"+i}>
                <button class={`learning__tabs-button ${activeTab === i ? "tab-active" : ""}`} type="button" on:click={() => toggleTab(i)}>
                  <svelte:component width="24px" height="24px" this={icon}/>
                  <span>{header}</span>
                </button>
              </li>
            {/each}
          </ul>
          <ul class="learning__tabs-contents">
            {#each tabPanels as {content, img}, i}
              <li class={`learning__tabs-tabpanel ${activeTab === i ? "tabpanel-active" : ""}`}>
                <div role="tabpanel" id={'tabpanel-' + i} aria-labelledby={"tab-" + i}>
                  {content}
                  <img class="tabpanel__img" src={img} alt="">
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </div>
      <div class="learning__container--right">
        {#each tabPanels as {phoneVideo, phoneImg}, i}
          <div class={`learning__tabs-phone ${activeTab === i ? "tabpanel-active" : ""}`}>
            {#if phoneVideo}
            <video src={phoneVideo} autoPlay muted loop playsInline></video>
            {:else if phoneImg}
              <img class="learning__img" src={phoneImg} alt="phone">
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  @import '../../../styles/vars';

  .learning {
    background-color: #F4F3F9;
    padding: 64px 0;
  }

  .learning__container {
    display: flex;
    justify-content: space-between;


    @media (max-width: 1023px) {
      flex-direction: column;
    }
  }

  .learning__container--left {
    flex: 1 0 55%;
    max-width: 55%;
    
    @media (max-width: 1023px) {
      flex: 1 0 auto;
      max-width: none;
    }
  }

  h2 {
    font-family: Oswald;
    font-size: 54px;
    text-align: center;
    padding-bottom: 32px;
    width: 100%;

    @media (max-width: 1199px) {
      font-size: 48px;
    }

    @media (max-width: 767px) {
      font-size: 40px;
    }
  }

  .learning__container--left {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .learning__tabs-headers {
    list-style: none;
    display: flex;
    padding-bottom: 32px;
    justify-content: space-around;
    padding-left: 0;

    @media (max-width: 767px) {
      flex-direction: column;
    }

    li:not(:last-child) {
      margin-right: 16px;

      @media (max-width: 767px) {
        margin-right: 0;
        margin-bottom: 16px;
      }
    }
  }

  .learning__tabs-button {
    border: 0;
    cursor: pointer;
    display: flex;
    opacity: 0.25;
    font-size: 18px;
    padding: 8px 16px;
    width: 100%;
    transition: all .3s ease;
    font-weight: bold;

    @media (max-width: 1199px) {
      font-size: 16px;
    }

    &.tab-active,
    &:hover,
    &:focus {
      background-color: $primary-color;
      opacity: 1;
      color: #fff;
      border-radius: 8px;
    }

    span {
      padding-left: 8px;
    }
  }

  .learning__tabs-contents {
    list-style: none;
    padding-left: 0;
  }

  .learning__tabs-tabpanel {
    display: none;
    white-space: pre-wrap;
    font-size: 18px;
    
    @media (max-width: 767px) {
      font-size: 16px;
    }

    &.tabpanel-active {
      display: block;
    }
  }

  .learning__tabs-phone {
    display: none;
    &.tabpanel-active {
      display: block;

      @media (max-width: 1023px) {
        display: none;
      }
    }
  }

  .learning__container--right {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @media (max-width: 1023px) {
      justify-content: center;
      align-items: flex-start;
    }
  }

  .tabpanel__img {
    max-height: 240px;
    margin: 16px auto 0;
  }

  .learning__img {
    width: 100%;
    height: auto;
  }
</style>