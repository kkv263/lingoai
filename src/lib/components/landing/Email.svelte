<script lang="ts">
    import SendIcon from "$lib/assets/SendIcon.svelte";

</script>

<section class="email" id="waitlist">
  <div class="container">
    <h2>Ready to lingo? Join the waitlist!</h2>
    <form class="email__input-container" action="/">
        <input placeholder="email@example.com" type="text" class="email__input">
        <button type="submit" class="email__button">
          <span>Join</span>
          <SendIcon width={"24px"} height={"24px"}/>
        </button>
    </form>
  </div>
</section>
<footer class="footer">
  <ul class="footer__list">
    <!-- <li>Privacy Policy</li> -->
    <!-- <li>Terms of Service</li> -->
    <li>2023 &copy; LingoAI</li>
  </ul>
</footer>

<style lang="scss">
  @import '../../../styles/vars';

  .email {
    padding: 64px 0 96px;
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

  .email__input-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .email__input {
    width: 100%;
    max-width: 640px;
    min-height: 64px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 1px solid #000;
    border-right: 0;
    padding: 8px 16px;
    font-weight: bold;
    font-size: 18px;

    &::placeholder {
      opacity: .5;
    }
  }

  .email__button {
    background-color: $primary-color;
    color: #fff;
    border: 0;
    min-height: 64px;
    font-weight: bold;
    font-size: 24px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid #000;
    border-left: 0;
    padding: 0 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s ease;
    span {
      margin-right: 8px;
    }

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }

  .footer {
    padding: 16px 0;
  }

  .footer__list {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    li:not(:last-child) {
      margin-right: 32px;
    }
  }
</style>