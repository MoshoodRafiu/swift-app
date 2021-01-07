<template>
  <div>
    <div v-if="false" class="verified-img-container">
      <div class="text-center">
        <img class="verified-img" src="../../../assets/verification/phone.svg" alt="verified">
        <div class="text-center verified-text mt-3">Phone Already Verified</div>
        <div class="phone-number my-1">09023415678</div>
      </div>
    </div>
    <div class="p-md-4">
      <div class="row">
        <div class="col-md-8 mt-3 mx-auto">
          <label for="phone">Phone Number</label>
          <div class="trade-form-group">
            <input id="phone" type="text" class="trade-form-control" placeholder="Enter Phone Number">
          </div>
        </div>
        <div class="col-md-4 mt-3 mx-auto">
          <label for="code">Verification Code</label>
          <div class="trade-form-group">
            <input id="code" readonly type="text" class="trade-form-control disabled" placeholder="Enter Code">
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-6">
          <button class="trade-action-btn send-code disabled">Send Code</button>
        </div>
        <div class="col-6">
          <button class="trade-action-btn">Verify Phone</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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