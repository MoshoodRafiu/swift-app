<template>
  <div>
    <div class="row" v-if="!$store.getters.showTradeWindowLoader">
      <div class="col-md-6 mt-3">
        <label for="amount-coin">Amount <span class="font-weight-bold">{{ $store.getters.getActiveCurrency.abbr }}</span></label>
        <div class="trade-form-group">
          <input id="amount-coin" type="number" class="trade-form-control" placeholder="e.g 0.001">
          <button class="trade-max-btn">Max</button>
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <div class="trade-form-group">
          <label for="amount-ngn">Amount <span class="font-weight-bold">NGN</span><span class="mx-2 text-emphasis">~ 300 USD</span></label>
          <input id="amount-ngn" type="number" class="trade-form-control" placeholder="e.g 1,000">
        </div>
      </div>
      <div class="col-md-4 mx-auto">
        <div class="trade-action-btn-wrapper">
          <button class="trade-action-btn"
                  @click="startTrade"
                  :class="{'disabled': tradeCancelled}">
            <span class="text-capitalize">{{ type }}</span> <span class="text-capitalize">{{ $store.getters.getActiveCurrency.name }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['tradeCancelled', 'type'],
    created() {
      this.$store.commit('setTradeWindowLoaderStatus', true);
      setTimeout(() => {
        this.$store.commit('setTradeWindowLoaderStatus', false);
      }, 1500)
    },
    methods: {
      startTrade(){
        if (!this.tradeCancelled){
          this.$emit('confirm', {title: 'Trade Confirmation', text: 'You are buying 0.0435 '+this.$store.getters.getActiveCurrency.abbr+' from devKunle at the rate of 390 per USD', button: 'Start Trade'});
        }
      }
    }
  }
</script>

<style>
  label{
    font-size: 13px;
    color: #b1afaf;
    margin-bottom: -10px;
  }
  .trade-form-control{
    width: 100%;
    height: 55px;
    border: 1px solid #b1afaf;
    border-radius: 5px;
    font-size: 14px;
    padding: 10px;
    color: #807e7e;
  }
  .trade-form-control:focus{
    outline: none;
  }
  .trade-form-group{
    position: relative;
  }
  .trade-max-btn{
    top: 2px;
    position: absolute;
    right: 2px;
    height: 51px;
    padding: 0 12px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: none;
    background: linear-gradient(155deg, #1641b5, #2ef3e4);
    -webkit-text-fill-color: #ffffff;
    color: white;
    font-size: 12px;
  }
  .trade-max-btn:focus{
    outline: none;
  }
  .trade-action-btn-wrapper{
    padding-top: 30px;
    text-align: center;
  }
  .trade-action-btn{
    width: 100%;
    height: 55px;
    background: linear-gradient(155deg, #1641b5, #2ef3e4);
    -webkit-text-fill-color: #ffffff;
    color: white;
    border: none;
    border-radius: 5px;
  }
  .trade-action-btn:focus{
    outline: none;
  }
  .trade-action-btn.disabled,
  .trade-action-btn.disabled:hover{
    background: linear-gradient(155deg, #8aa6f3, #98f1eb);
    -webkit-text-fill-color: #ffffff;
    cursor: not-allowed;
  }
  .trade-action-btn:hover,
  .trade-max-btn:hover{
    background: linear-gradient(155deg, #2ef3e4, #1641b5);
    -webkit-text-fill-color: #ffffff;
    outline: none;
  }
  .text-emphasis{
    color: #1d1c98;
    font-weight: bolder;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
  @media screen and (max-width: 500px) {
    .trade-action-btn-wrapper{
      padding-top: 20px;
    }
  }
</style>