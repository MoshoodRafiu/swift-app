<template>
  <div>
    <div v-if="false" class="verified-img-container">
      <div class="text-center">
        <img class="verified-img" src="../../../assets/verification/mail.svg" alt="verified">
        <div class="text-center verified-text mt-3">Email Already Verified</div>
        <div class="email-address my-1">swifthrivetest@gmail.com</div>
      </div>
    </div>
    <div class="p-md-4">
      <div class="text-center">
        <img class="not-verified-image" src="../../../assets/verification/email.svg" alt="email">
      </div>
      <div class="text-center doc-info">Didn't receive verification email?</div>
      <div class="text-center">
        <button class="ver-action-button">Request New Email</button>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>
  .verified-img-container{
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center !important;
  }
  .verified-img{
    width: 35%;
  }
  .verified-text{
    font-size: 17px;
    color: #22cf22;
  }
  .email-address{
    font-size: 13px;
    color: #B1AFAF;
  }
  .not-verified-image{
    width: 100px;
    margin: 20px 0;
  }
  @media screen and (max-width: 500px) {
    .verified-img{
      width: 70%;
    }
  }
</style>