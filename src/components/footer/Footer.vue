<template>
  <div>
    <section>
      <div class="row">
        <div class="col-md-4 wrapper">
          <div class="brand-name">Swift<span class="text-emphasis">hrive</span></div>
          <div class="copyright">
            <span>&copy; Copyright {{ (new Date()).getFullYear() }}</span>
          </div>
        </div>
        <div class="col-md-4 wrapper">
          <div class="mail">support@swifthrive.com</div>
          <div class="socials">
            <span class="fab fa-facebook-f social-link"></span>
            <span class="fab fa-twitter social-link"></span>
            <span class="fab fa-instagram social-link"></span>
            <span class="fab fa-linkedin-in social-link"></span>
            <span class="fab fa-telegram-plane social-link"></span>
          </div>
        </div>
        <div class="col-md-4 wrapper">
          <p class="about-text">Swifthrive is an online escrow cryptocurrency peer-to-peer exchange platform that bridges the gap between cryptocurrency buyers and seller at zero risk.</p>
        </div>
      </div>
      <div class="col-12">
        <div class="foot-note">
          <a href="#">Terms and Conditions</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  section{
    padding: 10px 60px;
  }
  .row .wrapper{
    padding: 50px 0;
    color: #807e7e;
  }
  .brand-name{
    font-size: 40px;
    font-weight: bold;
  }
  .copyright{
    color: #807e7e;
  }
  .text-emphasis{
    color: #2bffae;
  }
  .mail{
    font-size: 17px;
  }
  .socials{
    margin: 20px 0;
  }
  .socials .social-link{
    width: 50px;
    padding: 12px;
    text-align: center;
    background: linear-gradient(135deg, #1641b5, #63fff3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 10px 10px 0 0;
    border: 1px solid rgba(22, 65, 181, 0.4);
    border-radius: 3px;
  }
  .socials .social-link:hover{
    background: linear-gradient(135deg, #1641b5, #63fff3);
    -webkit-text-fill-color: #ffffff;
    border: none;
  }
  .about-text{
    color: #807e7e;
    letter-spacing: 1px;
  }
  .foot-note{
    text-align: right;
    padding: 5px;
    border-top: 1px solid rgba(128, 126, 126, 0.1);
  }
  .foot-note  a{
    color: #807e7e;
    font-size: 14px;
  }
  .foot-note  a:hover{
    text-decoration: none;
  }
  @media screen and (max-width: 500px){
    section{
      padding: 10px 42px;
    }
    .row .wrapper{
      padding: 35px 0;
    }
  }
</style>