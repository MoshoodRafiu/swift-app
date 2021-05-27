<template>
  <div>
    <div v-if="$store.state.authUser.verification.phone.status" class="verified-img-container">
      <div class="text-center">
        <img class="verified-img" src="../../../assets/verification/phone.svg" alt="verified">
        <div class="text-center verified-text mt-3">Phone Number Verified</div>
        <div class="phone-number my-1">09023415678</div>
        <div class="email-address small my-1" style="font-size: 10px">verified on {{ $store.state.authUser.verification.phone.on }}</div>
      </div>
    </div>
    <div v-else class="p-md-4">
      <app-alert v-if="alert.present" :type="alert.type" :message="alert.message"/>
      <div class="row">
        <div class="col-md-6 mt-2 mb-4">
          <div class="row">
            <div class="col-12">
              <label for="phone">Phone Number</label>
              <div class="trade-form-group">
                <input id="phone" v-model="phone" type="text" class="trade-form-control" placeholder="2349000000000">
                <app-validation-error-message v-if="errors && errors.phone" :message="errors.phone[0]"/>
              </div>
            </div>
            <div class="mt-3 col-12">
              <button @click="sendPhoneVerificationCode" class="trade-action-btn send-code">
                <span v-if="sendingCode" class="spinner-border" role="status"></span>
                <span v-else>{{ canVerify ? 'Resend Code' : 'Send Code' }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6 mt-2 mb-4">
          <div class="row">
            <div class="col-12">
              <label for="code">Verification Code</label>
              <div class="trade-form-group">
                <input id="code" :disabled="!canVerify" v-model="code" type="text" class="trade-form-control" :class="{'disabled': !canVerify}" placeholder="Enter Code">
                <app-validation-error-message v-if="errors && errors.code" :message="errors.code[0]"/>
              </div>
            </div>
            <div class="mt-3 col-12">
              <button @click="verifyPhone" class="trade-action-btn" :class="{'disabled': !canVerify}" :disabled="!canVerify">
                <span v-if="verifyingPhone" class="spinner-border" role="status"></span>
                <span v-else>Verify Number Phone</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Verification from "@/apis/Verification";
  import appAlert from "@/components/notification/Alert";
  import appValidationErrorMessage from "@/components/notification/ValidationErrorMessage";
  import Auth from "@/apis/Auth";

  export default {
    data(){
      return{
        canVerify: !! localStorage.getItem('phone_ver_key'),
        phone: this.$store.state.authUser.phone,
        code: null,
        verification_id: localStorage.getItem('phone_ver_key'),
        sendingCode: false,
        verifyingPhone: false,
        errors: [],
        counter: 0,
        alert: { present: false, type: null, message: null }
      }
    },
    methods: {
      sendPhoneVerificationCode(){
        this.sendingCode = true;
        Verification.sendPhoneVerificationCode({ phone: this.phone })
          .then(res => {
            this.removeAlertAndHideLoader();
            this.alert = { present: true, type: 'success', message: res.data.message };
            localStorage.setItem('phone_ver_key', res.data.data);
            this.verification_id = res.data.data;
            this.canVerify = true;
          })
          .catch(err => {
            this.removeAlertAndHideLoader();
            this.alert = { present: true, type: 'error', message: err.response.data.message ?? 'Something went wrong' };
            if (err.response.status === 422){
              this.errors = err.response.data.errors;
            }
          });
      },
      verifyPhone(){
        this.verifyingPhone = true;
        Verification.verifyPhone({verification_id: this.verification_id, code: this.code})
          .then(res => {
            this.removeAlertAndHideLoader();
            this.alert = { present: true, type: 'success', message: res.data.message };
            localStorage.removeItem('phone_ver_key');
          })
          .then(() => {
            Auth.user()
                .then(res => {
                  this.$store.commit('updateUserDetails', res.data.data);
                });
          })
          .catch(err => {
            this.removeAlertAndHideLoader();
            this.alert = { present: true, type: 'error', message: err.response.data.message ?? 'Something went wrong' };
            if (err.response.status === 422){
              this.errors = err.response.data.errors;
            }
          });
      },
      removeAlertAndHideLoader(){
        this.errors = [];
        this.alert = { present: false, type: null, message: null };
        this.sendingCode = false;
        this.verifyingPhone = false;
      }
    },
    components: {
      appAlert,
      appValidationErrorMessage
    }
  }
</script>

<style>
.trade-action-btn.send-code{
  background: #B1AFAF;
  color: #000000 !important;
}
.trade-form-control.disabled{
  cursor: not-allowed;
}
.trade-action-btn.send-code.disabled,
.trade-action-btn.send-code.disabled:hover {
  background: #c4c4c4 !important;
}
.trade-action-btn.send-code:hover{
  background: #c4c4c4 !important;
}
.phone-number{
  font-size: 13px;
  color: #B1AFAF;
}
</style>