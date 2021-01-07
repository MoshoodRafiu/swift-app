<template>
  <div>
    <div v-if="!$store.getters.showTradeWindowLoader" class="row">
      <div class="col-12">
        <div v-if="type === 'buy'" class="trade-page-details">Waiting for devKunle to confirm your payment, if confirmation takes too long please use the dispute trade button below to open chat window</div>
        <div v-if="type === 'sell'" class="trade-page-details">Waiting for devKunle to make payment of <span class="text-emphasis">NGN 34,000</span> to <span class="text-emphasis">019065346847, Access Bank PLC</span>. If payment takes too long please use the dispute trade button below to open chat window</div>
      </div>
      <div v-if="type === 'buy'" class="col-md-4 ml-auto">
        <div class="trade-action-btn-wrapper">
          <button class="trade-action-btn cancel"
                  @click="cancelTrade"
                  :class="{'disabled': tradeCancelled}">
            Cancel Trade
          </button>
        </div>
      </div>
      <div v-if="type === 'sell'" class="col-md-4 ml-auto">
        <div class="trade-action-btn-wrapper">
          <button class="trade-action-btn"
                  @click="confirmPayment"
                  :class="{'disabled': tradeCancelled}">
            I Have Received Payment
          </button>
        </div>
      </div>
      <div class="col-md-4 mr-auto">
        <div class="trade-action-btn-wrapper">
          <button class="trade-action-btn"
                  @click="disputeTrade"
                  :class="{'disabled': tradeCancelled}">
            Dispute Trade
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
    disputeTrade(){
      if (!this.tradeCancelled){
        this.$emit('confirm', {title: 'Dispute Confirmation', text: 'You are about to dispute this trade, confirm your action below', button: 'Dispute Trade'});
      }
    },
    cancelTrade(){
      if (!this.tradeCancelled){
        this.$emit('confirm', {title: 'Trade Cancellation', text: 'You are about to cancel this trade, confirm your action below', button: 'Cancel Trade'});
      }
    },
    confirmPayment(){
      if (!this.tradeCancelled){
        this.$emit('confirm', {title: 'Payment Confirmation', text: 'You are about to confirm payment for this trade, confirm your action below', button: 'Confirm Payment'});
      }
    }
  }
}
</script>

<style>

</style>