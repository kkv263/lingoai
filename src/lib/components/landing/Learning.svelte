<script lang="ts"></script>

<section class="learning">
  <div class="container">
    <div class="learning__container">
      <div class="learning__container--left">
        <h2>Learning a new language<br> has never been easier</h2>
      </div>
      <div class="learning__container--right">
        <img class="learning__img" src="src/lib/assets/img/phone.png" alt="">
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .learning {
    background-color: #F4F3F9;
    padding: 64px 0;
  }

  .learning__container {
    display: flex;
    justify-content: space-between;
  }

  h2 {
    font-family: Oswald;
    font-size: 48px;
    text-align: center;
  }

  .learning__container--left {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .learning__img {
    max-width: 640px;
  }
</style>