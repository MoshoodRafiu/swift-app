<template>
  <div class="page-wrapper">
    <div class="page-form-wrapper">
      <div class="brand-name">
        <img src="../../assets/logo.png" class="brand-logo" alt="logo">
        <div>Swift<span class="text-emphasis">hrive</span></div>
      </div>
      <div class="page-form">
        <div class="title">
          Login
        </div>
        <div class="body">
          <app-alert v-if="alert.present" :type="alert.type" :message="alert.message"/>
          <label class="mt-2">
            <input type="text" v-model="credentials.email" class="form-field" placeholder="Email Address">
          </label>
          <app-validation-error-message v-if="errors.email" :message="errors.email[0]"/>
          <label class="mt-2">
            <input type="password" v-model="credentials.password" class="form-field" placeholder="Password">
          </label>
          <app-validation-error-message v-if="errors.password" :message="errors.password[0]"/>
          <div class="mt-3">
            <button :disabled="pageIsProcessing" @click="login" class="form-button" :class="{'disabled': pageIsProcessing}">
              <span v-if="pageIsProcessing" class="spinner-border" role="status"></span>
              <span v-else>Login</span>
            </button>
          </div>
        </div>
        <div class="footer">
          <a @click="$router.push('/forgot-password')">Forgot password?</a>
        </div>
      </div>
      <div class="page-info">
        <a @click="$router.push('/register')">Don't have account? Register Now</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Auth from "@/apis/Auth";
  import appAlert from "@/components/notification/Alert";
  import appValidationErrorMessage from "@/components/notification/ValidationErrorMessage";

  export default {
    data(){
      return{
        credentials: {
          email: null,
          password: null
        },
        errors: [],
        alert: { present: false, type: null, message: null }
      }
    },
    methods: {
      login(){
        this.$store.state.showActionLoader = true;
        Auth.login(this.credentials)
            .then(res => {
              this.removeErrorsAndHideLoader();
              this.alert = { present: true, type: 'success', message: 'Login successful, redirecting now...' };
              this.$store.commit('logUserIn', res.data.data);
              setTimeout(() => this.$router.push({ name: 'verifications' }) ,2000);
            })
            .catch(err => {
              this.removeErrorsAndHideLoader();
              this.alert = { present: true, type: 'error', message: err.response.data.message ?? 'Something went wrong' };
              if (err.response.status === 422){
                this.errors = err.response.data.errors;
              }
            });
      },
      removeErrorsAndHideLoader(){
        this.errors = [];
        this.alert = { present: false, type: null, message: null };
        this.$store.state.showActionLoader = false;
      }
    },
    computed: {
      pageIsProcessing(){
        return this.$store.state.showActionLoader;
      }
    },
    components: {
      appAlert,
      appValidationErrorMessage
    }
  }
</script>

<style scoped>
  .page-wrapper{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #041c5b;
    display: table;
    transition: opacity 0.3s ease;
  }
  .brand-name{
    text-align: center;
    margin: 20px;
    font-size: 30px;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .brand-name .text-emphasis{
    color: #2bffae;
  }
  .brand-logo{
    padding: 10px;
    width: 50px;
  }
  .page-form{
    width: 600px;
    margin: 10px auto;
    padding: 70px 70px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .title{
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    color: #807e7e;
  }
  .body{
    width: 100%;
    margin: 20px 0;
  }
  label{
    width: 100%;
  }
  .form-field{
    width: 100%;
    height: 55px;
    border-radius: 3px;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    font-size: 15px;
  }
  .form-field:focus{
    border: 1px solid #1641b5;
    outline: none;
  }
  .form-button{
    width: 100%;
    height: 55px;
    background: linear-gradient(155deg, #1641b5, #2ef3e4);
    -webkit-text-fill-color: #ffffff;
    color: white;
    border: none;
    border-radius: 3px;
  }
  .form-button.disabled,
  .form-button.disabled:focus,
  .form-button.disabled:hover{
    cursor: not-allowed;
    background: linear-gradient(155deg, #4d71d9, #8efff4);
  }
  .form-button:hover{
    background: linear-gradient(155deg, #2ef3e4, #1641b5);
    -webkit-text-fill-color: #ffffff;
  }
  .form-button:focus{
    outline: none;
  }
  .footer{
    text-align: center;
  }
  .footer a {
    color: #807e7e;
    font-size: 13px;
  }
  .footer a:hover {
    color: #807e7e;
    cursor: pointer;
    text-decoration: underline;
  }
  .page-info{
    text-align: center;
    font-size: 13px;
  }
  .page-info a{
    color: white;
  }
  .page-info a:hover{
    color: white;
    cursor: pointer;
    text-decoration: underline;
  }
  @media screen and (max-width: 600px) {
    .page-form {
      width: 400px;
      padding: 50px 30px;
    }
  }

  @media screen and (max-width: 450px) {
    .page-form {
      width: 350px;
      padding: 50px 20px;
    }
    .form-field{
      margin: 8px 0;
      font-size: 14px;
    }
  }
  @media screen and (max-width: 400px) {
    .page-form {
      width: 320px;
      padding: 60px 20px;
    }
  }
  @media screen and (max-width: 330px) {
    .page-form {
      width: 300px;
      padding: 60px 15px;
    }
  }
</style>