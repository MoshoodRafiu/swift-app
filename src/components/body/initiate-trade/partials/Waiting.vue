<template>
  <div>
    <div v-if="!$store.getters.showTradeWindowLoader" class="row">
      <div class="col-12">
        <div class="trade-page-details">Waiting for devKunle to accept your trade, the trade window will automatically closed when the countdown is complete and you held coin will be released. Use the SMS and MAIL icon above to summon devKunle.</div>
      </div>
      <div class="col-md-4 mx-auto">
        <div class="trade-action-btn-wrapper">
          <button class="trade-action-btn cancel"
                  @click="cancelTrade"
                  :class="{'disabled': tradeCancelled}">
            Cancel Trade
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tradeCancelled'],
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
  }
}
</script>

<style>

</style>