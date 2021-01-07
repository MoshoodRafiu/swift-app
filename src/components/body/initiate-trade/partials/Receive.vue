<template>
  <div>
    <div v-if="!$store.getters.showTradeWindowLoader" class="row">
      <div class="col-12">
        <div class="trade-page-details">Your payment has been confirmed, a total of <span class="text-emphasis">0.007663 {{ $store.getters.getActiveCurrency.abbr }}</span>, has been deposited to your <span class="text-emphasis text-capitalize">Swifthrive {{ $store.getters.getActiveCurrency.name }} wallet</span>. Kindly note that this can take few minutes to reflect</div>
      </div>
      <div class="col-md-4 mx-auto">
        <div class="trade-action-btn-wrapper">
          <button class="trade-action-btn"
                  :class="{'disabled': tradeCancelled}">
            Skip
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
    releaseCoin(){
      if (!this.tradeCancelled){
        this.$emit('confirm', {title: 'Coin Release', text: 'You are about to release your coin to the devKunle, confirm your action below', button: 'Release Coin'});
      }
    },
  }
}
</script>

<style>

</style>