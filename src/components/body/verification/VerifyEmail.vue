<template>
  <div class="page-container">
    <div class="col-md-8 mx-auto verification-container">
      <div :class="{' d-flex align-items-center': false}">
        <div class="verification-body d-flex justify-content-center text-center align-items-center">
          <div v-if="loading">
            <div style="width: 100px; height: 100px" class="ml-2 spinner-border text-secondary" role="status"></div>
            <div class="mt-3 display-5">Verifying Email Address...</div>
          </div>
          <div v-if="!loading && !success" class="verified-img-container">
            <div class="text-center">
              <img class="verified-img" src="../../../assets/verification/email-failed.svg" alt="verified">
              <div class="text-center text-danger font-weight-bold mt-3">{{ message }}</div>
              <button v-if="message !== 'Email already verified' && message !== 'User account not found'" @click="$router.push({ name: 'verifications' })" class="ver-action-button">
                <span>Request New Email</span>
              </button>
            </div>
          </div>
          <div v-if="!loading && success" class="verified-img-container">
            <div class="text-center">
              <img class="verified-img" src="../../../assets/verification/mail.svg" alt="verified">
              <div class="text-center font-weight-bold verified-text mt-3">{{ message }}</div>
              <div class="email-address my-1">{{ user.email }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Verification from "@/apis/Verification";

export default {
  data(){
    return{
      activeComponent: 'app-email',
      alert: { present: false, type: null, message: null },
      loading: true,
      success: false,
      message: null,
      user: null
    }
  },
  mounted() {
    let token = this.$route.query.otp;
    let email = this.$route.query.email;
    if (token && email){
      this.verifyEmail({token, email});
    }else{
      this.$router.push({name: 'verifications'})
    }
  },
  created() {
    this.$store.commit('hideNavigations');
  },
  methods: {
    switchComponent(to){
      this.activeComponent = to;
    },
    verifyEmail(data){
      Verification.verifyEmail(data)
          .then(res => {
            this.loading = false;
            this.success = true;
            this.message = res.data.message;
            this.user = res.data.data;
          })
          .catch(err => {
            this.loading = false;
            this.success = false;
            this.message = err.response.data.message;
          });
    }
  }
}
</script>

<style>
</style>