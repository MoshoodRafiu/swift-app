<template>
  <div class="page-container">
    <div class="col-md-8 mx-auto profile-container">
      <div class="row">
        <div class="col-md-12 mt-3">
          <div class="row">
            <div class="col-md-12">
              <h5 class="section-title">Personal Details</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <app-alert v-if="alert.present" :type="alert.type" :message="alert.message"/>
            </div>
            <div class="col-md-6 mb-3">
              <label for="username">Username</label>
              <div class="trade-form-group">
                <input id="username" type="text" disabled v-model="profile.username" class="trade-form-control" placeholder="Username">
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="email">Email</label>
              <div class="trade-form-group">
                <input id="email" type="email" disabled v-model="profile.email" class="trade-form-control" placeholder="Email">
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="firstname">First Name</label>
              <div class="trade-form-group">
                <input id="firstname" v-model="profile.first_name" type="text" class="trade-form-control" placeholder="First Name">
              </div>
              <app-validation-error-message v-if="errors && errors.first_name" :message="errors.first_name[0]"/>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastname">Last Name</label>
              <div class="trade-form-group">
                <input id="lastname" type="text" v-model="profile.last_name" class="trade-form-control" placeholder="Last Name">
              </div>
              <app-validation-error-message v-if="errors && errors.last_name" :message="errors.last_name[0]"/>
            </div>
            <div class="col-md-6 mb-3">
              <label for="othername">Other Name</label>
              <div class="trade-form-group">
                <input id="othername" type="text" v-model="profile.other_name" class="trade-form-control" placeholder="Other Name">
              </div>
              <app-validation-error-message v-if="errors && errors.other_name" :message="errors.other_name[0]"/>
            </div>
            <div class="col-md-6">
              <label for="phone">Phone</label>
              <div class="trade-form-group">
                <input id="phone" v-model="profile.phone" :disabled="$store.state.authUser.verification.phone.status" type="text" class="trade-form-control" placeholder="Phone">
              </div>
              <app-validation-error-message v-if="errors && errors.phone" :message="errors.phone[0]"/>
            </div>
          </div>
          <div class="row my-3">
            <div class="col-md-6 mx-auto">
              <div>
                <button @click="updateProfile" class="trade-action-btn">
                  <span v-if="loading.profile" class="spinner-border" role="status"></span>
                  <span v-else>Update Personal Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="row mt-4">
        <div class="col-md-6 r-border">
          <div class="row">
            <div class="col-md-12">
              <h5 class="section-title">Change Transaction Pin</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <label for="o_pin">Old Pin</label>
              <div class="trade-form-group">
                <input id="o_pin" type="number" class="trade-form-control" placeholder="Old Pin">
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <label for="n_pin">New Pin</label>
              <div class="trade-form-group">
                <input id="n_pin" type="number" class="trade-form-control" placeholder="New Pin">
              </div>
            </div>
            <div class="col-md-12">
              <label for="cn_pin">Confirm New Pin</label>
              <div class="trade-form-group">
                <input id="cn_pin" type="number" class="trade-form-control" placeholder="Confirm New Pin">
              </div>
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-md-12 mx-auto">
              <div class="trade-action-btn-wrapper">
                <button class="trade-action-btn">
                  Change Pin
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-12">
              <h5 class="section-title">Change Password</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <label for="o_pass">Old Password</label>
              <div class="trade-form-group">
                <input id="o_pass" v-model="password.old" type="password" class="trade-form-control" placeholder="Old Password">
              </div>
              <app-validation-error-message v-if="errors && errors.old_password" :message="errors.old_password[0]"/>
            </div>
            <div class="col-md-12 mb-3">
              <label for="n_pass">New Password</label>
              <div class="trade-form-group">
                <input id="n_pass" v-model="password.new" type="password" class="trade-form-control" placeholder="New Password">
              </div>
              <app-validation-error-message v-if="errors && errors.new_password" :message="errors.new_password[0]"/>
            </div>
            <div class="col-md-12">
              <label for="cn_pass">Confirm New Password</label>
              <div class="trade-form-group">
                <input id="cn_pass" v-model="password.confirm_new" type="password" class="trade-form-control" placeholder="Confirm New Password">
              </div>
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-md-12 mx-auto">
              <div class="trade-action-btn-wrapper">
                <button @click="updatePassword" class="trade-action-btn">
                  <span v-if="loading.password" class="spinner-border" role="status"></span>
                  <span v-else>Change Password</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Profile from "@/apis/Profile";
  import appAlert from "@/components/notification/Alert";
  import appValidationErrorMessage from "@/components/notification/ValidationErrorMessage";
  export default {
    data(){
      return{
        profile: {
          username: this.$store.state.authUser.username,
          email: this.$store.state.authUser.email,
          first_name: this.$store.state.authUser.first_name,
          last_name: this.$store.state.authUser.last_name,
          other_name: this.$store.state.authUser.other_name,
          phone: this.$store.state.authUser.phone,
        },
        password: {
          old: null,
          new: null,
          confirm_new: null
        },
        loading: {profile: false, password: false},
        errors: [],
        alert: { present: false, type: null, message: null }
      }
    },
    created() {
      this.$store.commit('hideNavigations');
    },
    methods: {
      updateProfile(){
        let credentials = {
          first_name: this.profile.first_name,
          last_name: this.profile.last_name,
          other_name: this.profile.other_name,
          phone: this.profile.phone
        }
        if (!this.loading.profile){
          this.loading.profile = true;
          Profile.updateProfile(credentials)
            .then(res => {
              this.removeErrorsAndHideLoader();
              this.alert = { present: true, type: 'success', message: res.data.message };
              this.$store.commit('logUserIn', res.data.data);
              this.loading.profile = false;
              window.scrollTo(0,0);
            })
            .catch(err => {
              window.scrollTo(0,0);
              this.removeErrorsAndHideLoader();
              this.alert = { present: true, type: 'error', message: err.response.data.message ?? 'Something went wrong' };
              if (err.response.status === 422){
                this.errors = err.response.data.errors;
              }
              this.loading.profile = false;
            });
        }
      },
      updatePassword(){
        let credentials = {
          new_password: this.password.new,
          old_password: this.password.old,
          new_password_confirmation: this.password.confirm_new
        }
        if (!this.loading.password){
          this.loading.password = true;
          Profile.updatePassword(credentials)
              .then(res => {
                this.removeErrorsAndHideLoader();
                this.alert = { present: true, type: 'success', message: res.data.message };
                this.loading.password = false;
                this.scrollToTop();
                this.password = { old: null, new: null, confirm_new: null };
              })
              .catch(err => {
                this.removeErrorsAndHideLoader();
                this.alert = { present: true, type: 'error', message: err.response.data.message ?? 'Something went wrong' };
                if (err.response.status === 422){
                  this.errors = err.response.data.errors;
                }else{
                  this.scrollToTop();
                }
                this.loading.password = false;
              });
        }
      },
      removeErrorsAndHideLoader(){
        this.errors = [];
        this.alert = { present: false, type: null, message: null };
      },
      scrollToTop() {
        window.scrollTo(0,0);
      }
    },
    components: {
      appAlert,
      appValidationErrorMessage
    }
  }
</script>

<style>
  .profile-container{
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 25px #cccccc;
    padding: 20px 15px;
  }
  .section-title{
    color: #807e7e;
  }
  .r-border{
    border-right: 1px solid #e3dfdf;
  }
  @media screen and (max-width: 767px) {
    .r-border{
      border-right: none;
    }
  }
</style>