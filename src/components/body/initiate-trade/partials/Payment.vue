<template>
  <div>
    <div v-if="!$store.getters.showTradeWindowLoader" class="row">
      <div class="col-12">
        <span class="trade-page-details">Payment of <span class="text-emphasis">NGN 34,000 <button @click="displayCopiedMessage('34000')" @mouseover="$store.commit('showTip', $event)" @mouseleave="$store.commit('hideTip', $event)" class="copy-trade-id-btn"><span class="copied-tip" :style="{'display': showCopied ? 'block' : 'none'}">Copied</span><span class="fa fa-copy mx-1"></span></button></span> should be made to the account details below</span>
      </div>
      <div class="col-md-6 mt-3">
        <label for="amount">Amount</label>
        <div class="trade-form-group">
          <input id="amount" type="text" class="trade-form-control" readonly :value="0.0567+' '+$store.getters.getActiveCurrency.abbr">
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <label for="bank">Bank Name</label>
        <div class="trade-form-group">
          <input id="bank" type="text" class="trade-form-control" readonly value="Access Bank PLC">
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <label for="acct-name">Account Name</label>
        <div class="trade-form-group">
          <input id="acct-name" type="text" class="trade-form-control" readonly value="Swifthrive Test">
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <label for="acct-num">Account Number </label>
        <div class="trade-form-group">
          <input id="acct-num" type="text" class="trade-form-control" value="0760952431" readonly>
          <button @mouseover="$store.commit('showTip', $event)" @mouseleave="$store.commit('hideTip', $event)" @click="copyToClipboard('acct-num')" class="trade-copy-btn"><span class="tip">Copy</span><span class="fa fa-copy"></span></button>
        </div>
      </div>
      <div class="col-md-12 mt-3">
        <label for="ref">Reference </label>
        <div class="trade-form-group">
          <input id="ref" type="text" class="trade-form-control" value="drfgsdnhgdjkdghmw64rytr453fhd86f for Swifthrive test" readonly>
          <button @mouseover="$store.commit('showTip', $event)" @mouseleave="$store.commit('hideTip', $event)" @click="copyToClipboard('ref')" class="trade-copy-btn"><span class="tip">Copy</span><span class="fa fa-copy"></span></button>
        </div>
      </div>
      <div class="col-md-4 ml-auto">
        <div class="trade-action-btn-wrapper">
          <button class="trade-action-btn cancel"
                  @click="cancelTrade"
                  :class="{'disabled': tradeCancelled}">
            Cancel Trade
          </button>
        </div>
      </div>
      <div class="col-md-4 mr-auto">
        <div class="trade-action-btn-wrapper">
          <button class="trade-action-btn"
                  @click="makePayment"
                  :class="{'disabled': tradeCancelled}">
            I Have Made Payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tradeCancelled'],
  data(){
    return{
      showCopied: false
    }
  },
  created() {
    this.$store.commit('setTradeWindowLoaderStatus', true);
    setTimeout(() => {
      this.$store.commit('setTradeWindowLoaderStatus', false);
    }, 1500)
  },
  methods: {
    makePayment(){
      if (!this.tradeCancelled){
        this.$emit('confirm', {title: 'Payment Confirmation', text: 'You are about to confirm that you have made payment for this trade, confirm your action below', button: 'Payment Made'});
      }
    },
    cancelTrade(){
      if (!this.tradeCancelled){
        this.$emit('confirm', {title: 'Trade Cancellation', text: 'You are about to cancel this trade, confirm your action below', button: 'Cancel Trade'});
      }
    },
    copyToClipboard: (input) => {
      let inputFieldTextToCopy = document.getElementById(input);
      inputFieldTextToCopy.select();
      inputFieldTextToCopy.setSelectionRange(0, 99999);
      document.execCommand("copy");
    },
    displayCopiedMessage(field){
      const tempInput = document.createElement("input");
      tempInput.value = field;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      this.showCopied = true;
      setTimeout(() => {
        this.showCopied = false;
      }, 1500);
    },
  }
}
</script>

<style>
  .trade-page-details{
    color: #807e7e;
  }
  .trade-copy-btn{
    background: #ccc;
    color: #000;
    top: 2px;
    position: absolute;
    right: 2px;
    height: 51px;
    padding: 0 20px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: none;
    font-size: 15px;
  }
  .trade-copy-btn:hover{
    background: #807e7e;
  }
  .trade-copy-btn:focus{
    outline: none;
  }
  .display-tooltip .tip{
    display: block;
  }
  .tip{
    position: absolute;
    margin-top: -67px;
    margin-left: -15px;
    background: #444242;
    padding: 10px;
    border-radius: 10px;
    font-size: 13px;
    display: none;
    color: white;
    z-index: 9999;
  }
  span.tip:before {
    content: ' ';
    height: 0;
    position: absolute;
    width: 0;
    left: 18px;
    top: 100%;
    border: 5px solid transparent;
    border-right-color: #444242;
    transform: rotateZ(-90deg);
  }
  .trade-action-btn.cancel{
    background: red;
  }
  .trade-action-btn.cancel.disabled,
  .trade-action-btn.cancel.disabled:hover{
    background: #ee8484;
  }
  .trade-action-btn.cancel:hover{
    background: #d60c1e;
  }
  .trade-page-details{
    font-size: 14px;
  }
</style>