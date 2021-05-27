<template>
  <div>
    <div v-if="emailIsVerified" class="verified-img-container">
      <div class="text-center">
        <img class="verified-img" src="../../../assets/verification/mail.svg" alt="verified">
        <div class="text-center verified-text mt-3">Email Address Verified</div>
        <div class="email-address my-1">{{ $store.state.authUser.email }}</div>
        <div class="email-address small my-1" style="font-size: 10px">verified on {{ $store.state.authUser.verification.email.on }}</div>
      </div>
    </div>
    <div v-else class="p-md-4">
      <app-alert v-if="alert.present" :type="alert.type" :message="alert.message"/>
      <div class="text-center">
        <img class="not-verified-image" src="../../../assets/verification/email.svg" alt="email">
      </div>
      <div class="text-center small doc-info">We have emailed a verification link to <b>{{ $store.state.authUser.email }}</b>, kindly verify your email address to proceed.</div>
      <div class="text-center small doc-info">Didn't receive verification email?</div>
      <div class="text-center">
        <button :disabled="pageIsProcessing" :class="{'disabled': pageIsProcessing}" @click="requestNewEmail" class="ver-action-button">
          <span>Request New Email</span>
          <span v-if="pageIsProcessing" style="width: 20px; height: 20px" class="ml-2 spinner-border" role="status"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Verification from "@/apis/Verification";
  import appAlert from "@/components/notification/Alert";
  export default {
    data(){
      return{
        alert: { present: false, type: null, message: null }
      }
    },
    methods: {
      requestNewEmail(){
        this.$store.state.showActionLoader = true;
        Verification.resendVerificationEmail()
          .then(res => {
            this.removeAlertAndHideLoader();
            this.alert = { present: true, type: 'success', message: res.data.message };
          })
          .catch(err => {
            this.removeAlertAndHideLoader();
            this.alert = { present: true, type: 'error', message: err.response.data.message ?? 'Something went wrong' };
          })
      },
      removeAlertAndHideLoader(){
        this.alert = { present: false, type: null, message: null };
        this.$store.state.showActionLoader = false;
      }
    },
    computed: {
      pageIsProcessing(){
        return this.$store.state.showActionLoader;
      },
      emailIsVerified(){
        return this.$store.state.authUser.verification.email.status;
      }
    },
    components: {
      appAlert
    }
  }
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