<template>
  <div class="page-container">
    <div class="col-md-8 mx-auto profile-container">
      <div class="row">
        <div class="col-md-8 mt-3 r-border">
          <div class="row">
            <div class="col-md-12">
              <h5 class="section-title">Personal Details</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="username">Username</label>
              <div class="trade-form-group">
                <input id="username" type="text" value="devKunle" class="trade-form-control" placeholder="Username">
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="email">Email</label>
              <div class="trade-form-group">
                <input id="email" type="email" value="swifthrive@gmail.com" class="trade-form-control" placeholder="Email">
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="firstname">First Name</label>
              <div class="trade-form-group">
                <input id="firstname" type="text" class="trade-form-control" placeholder="First Name">
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastname">Last Name</label>
              <div class="trade-form-group">
                <input id="lastname" type="text" class="trade-form-control" placeholder="Last Name">
              </div>
            </div>
            <div class="col-md-6">
              <label for="phone">Phone</label>
              <div class="trade-form-group">
                <input id="phone" type="text" class="trade-form-control" placeholder="Phone">
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-12 mx-auto">
              <div class="trade-action-btn-wrapper">
                <button class="trade-action-btn">
                  Update Personal Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-3">
          <div class="row">
            <div class="col-md-12">
              <h5 class="section-title">Bank Details</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <label for="bank">Bank Name</label>
              <div class="trade-form-group">
                <input id="bank" type="text" class="trade-form-control" placeholder="Bank Name">
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <label for="account_name">Account Name</label>
              <div class="trade-form-group">
                <input id="account_name" type="text" class="trade-form-control" placeholder="Account Name">
              </div>
            </div>
            <div class="col-md-12">
              <label for="account_number">Account Number</label>
              <div class="trade-form-group">
                <input id="account_number" type="text" class="trade-form-control" placeholder="Account Number">
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-12 mx-auto">
              <div class="trade-action-btn-wrapper">
                <button class="trade-action-btn">
                  Update Bank Details
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
                <input id="o_pass" type="password" class="trade-form-control" placeholder="Old Password">
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <label for="n_pass">New Password</label>
              <div class="trade-form-group">
                <input id="n_pass" type="password" class="trade-form-control" placeholder="New Password">
              </div>
            </div>
            <div class="col-md-12">
              <label for="cn_pass">Confirm New Password</label>
              <div class="trade-form-group">
                <input id="cn_pass" type="password" class="trade-form-control" placeholder="Confirm New Password">
              </div>
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-md-12 mx-auto">
              <div class="trade-action-btn-wrapper">
                <button class="trade-action-btn">
                  Change Password
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
  export default {
    created() {
      this.$store.commit('hideNavigations');
    },
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
    color: #B1AFAF;
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