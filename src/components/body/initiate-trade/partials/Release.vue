<template>
  <div>
    <div v-if="!$store.getters.showTradeWindowLoader" class="row">
      <div class="col-12">
        <div class="trade-page-details">You have confirmed devKunle's payment of <span class="text-emphasis">NGN 34,000</span>, release the coin to devKunle with the button below. Kindly note that the coin will be automatically released if there is delay.</div>
      </div>
      <div class="col-md-4 mx-auto">
        <div class="trade-action-btn-wrapper">
          <button class="trade-action-btn"
                  @click="releaseCoin"
                  :class="{'disabled': tradeCancelled}">
            Release Coin
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