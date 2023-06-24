<script lang="ts"></script>

<section class="hero">
  <div class="orange-circle"></div>
  <div class="white-circle"></div>
  <div class="container">
    <div class="hero__content">
      <div class="hero__content--left">
        <img class="hero__img" src="src/lib/assets/img/hero_model.png" alt="">
      </div>
      <div class="hero__content--right">
        <h1 class="hero__headline"> 
          <div class="hero__headline--top">
            <span>Say</span>
            <div class="hero__cube-container">
              <span class="hero__cube">
                <div class="hero__cube-face hero__cube-face--front">Hello</div>
                <div class="hero__cube-face hero__cube-face--back"><div class="back-text">こんにちは</div></div>
                <div class="hero__cube-face hero__cube-face--top">Hola</div>
                <div class="hero__cube-face hero__cube-face--bottom">नमस्ते</div>
              </span>
            </div>
          </div>
          to LingoAI
        </h1>
        <div class="hero__subheadline">Immerse yourself in different <br> languages using AI</div>
        <button class="hero__button" type="button">Join the Waitlist</button>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  $cube-width: 300px;
  $translateZ: calc($cube-width / 6);

  .hero {
    background-image: linear-gradient(to right, #fff 0%, #fff 40%, #FF710B 40%, #FF710B 100%);
    position: relative;

    @media (max-width: 1023px) {
      background-image: none;
      background-color: #FF710B;
      padding: 32px 0;
    }

    .orange-circle {
      position: absolute;
      top: 8px;
      left: 8%;
      border-radius: 100%;
      width: 120px;
      height: 120px;
      background-color: #FF710B;  
      z-index: 1;

      @media (max-width: 1023px) {
        display: none;
      }

      &:after {
        content: '';
        position: absolute;
        left: 0px;
        top: 120px;
        background-color: #FF710B;  
        width: 32px;
        height: 32px;
        border-radius: 100%;
      }
    }

    .white-circle {
      content: '';
      position: absolute;
      bottom: 8px;
      left: calc(40% + 32px);
      border-radius: 100%;
      width: 48px;
      height: 48px;
      background-color: #fff;

      @media (max-width: 1023px) {
        top: 48px;
        bottom: auto;
        left: auto;
        right: 15%;
      }

      &:after {
        content: '';
        position: absolute;
        bottom: 48px;
        left: 48px;
        border-radius: 100%;
        width: 16px;
        height: 16px;
        background-color: #fff; 
      }
    }
  }

  .hero__content {
    display: flex;

    @media (max-width: 1023px) {
      flex-direction: column;
    }
  }

  .hero__content--left {
    position: relative;
  }

  .hero__img {
    border-radius: 100%;
    margin: 0 auto;

    @media (max-width: 1023px) {
      max-width: 480px;
      width: 100%;
    }
  }

  .hero__content--right {
    flex: 1 0 50%;
    max-width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 80px 0;

    @media (max-width: 1279px) {
      padding: 40px 0;
    }

    @media (max-width: 1023px) {
      flex: 1 0 auto;
      max-width: none;
    }
  }
  

  .hero__headline {
    color: #fff;
    font-size: 80px;
    text-align: center;
    margin: 0;
    padding-bottom: 16px;
    line-height: 1.3;

    @media (max-width: 1279px) {
      font-size: 64px;
    }

    @media (max-width: 767px) {
      font-size: 54px;
    }
  }
  
  .hero__headline--top {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .hero__cube-container {
    perspective: 800px;
    display: inline-flex;
    justify-content: center;
  }

  .hero__cube {
    display: inline-block;
    width: $cube-width;
    height: 100px;
    position: relative;
    transform-style: preserve-3d;
    margin-left: 32px;
    animation: rotateCube 12s infinite;

    @media (max-width: 1279px) {
      margin-left: 16px;
      width: $cube-width - 32px;
      height: 88px;
      margin-bottom: 16px;
    }

    @media (max-width: 767px) {
      width: $cube-width - 64px;
    }
  }

  @keyframes rotateCube {
    0% {
    transform: rotateX(0deg)
    }
    8.33% {
      transform: rotateX(90deg)
    }
    25% {
      transform: rotateX(90deg)
    }
    33.33% {
      transform: rotateX(180deg)
    }
    50% {
      transform: rotateX(180deg)
    }
    58.33% {
      transform: rotateX(270deg)
    }
    75% {
      transform: rotateX(270deg)
    }
    83.33% {
      transform: rotateX(360deg)
    }
    100% {
      transform: rotateX(360deg)
    }
  }

  .hero__cube-face {
    position: absolute;
    width: $cube-width;
    height: 100px;
    border: 2px solid #fff;
    font-size: 80px;
    font-weight: bold;
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FF710B;  
    line-height: 1;
    left: 50%;
    bottom: 0;

    @media (max-width: 1279px) {
      font-size: 64px;
      width: $cube-width - 64px;
    }

    @media (max-width: 767px) {
      width: $cube-width - 96px;
      font-size: 54px;
    }
  }

  .hero__cube-face--front  { transform: translateZ($translateZ) translateX(-50%); z-index: 1; }
  .hero__cube-face--back   { 
    left: auto;
    right: 50%;
    transform: rotateY(180deg) translateZ($translateZ) translateX(-50%); 
    .back-text {
      transform: rotate(180deg);
      font-size: 54px;

      @media (max-width: 1279px) {
        font-size:36px;
      }
    }
  }
  .hero__cube-face--top    { transform: rotateX( 90deg) translateZ($translateZ) translateX(-50%); }
  .hero__cube-face--bottom { transform: rotateX(-90deg) translateZ($translateZ) translateX(-50%); }

  .hero__subheadline {
    color: #fff;
    font-size: 24px;
    text-align: center;
    padding-bottom: 32px;

    @media (max-width: 1279px) {
      font-size: 20px;
    }
  }

  .hero__button {
    border-radius: 8px;
    background-color: #fff;
    border: 0;
    margin-top: auto;
    font-size: 24px;
    font-weight: bold;
    color: #FF710B;
    padding: 4px 24px;
    cursor: pointer;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
    transition: all .3s ease;

    &:hover {
      background-color: darken(#fff, 10%);
    }
  }
</style>