<template>
  <div>
    <div class="trades-list">
      <div v-for="trade in 6" :key="trade" class="row trade-wrapper">
        <div class="col-md-3 trade-user-qty">
          <div>
            Swifthrive Wallet
          </div>
          <div class="trade-small-info">
            via <a href="#">BTC wallet</a>
          </div>
        </div>
        <div class="col-md-4 trade-amount">
          <div>
            0.0065346 - 0.56456236 BTC
          </div>
          <div class="trade-small-info">
            450 per USD <span class="font-weight-bold trade-type bg-success">Buy</span>
          </div>
        </div>
        <div class="col-md-3">
          <div>
            5 mins trade
          </div>
          <div class="trade-small-info font-italic font-weight-bold text-success">
            Active
          </div>
        </div>
        <div class="col-md-2 text-right my-auto">
          <div>
            <button class="ver-action-button">Edit</button>
            <button class="ver-action-button" @click="deleteAdvert">Del</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="pagination col-12">
        <div class="pagination-wrapper ml-auto">
          <span class="pagination-link">Prev</span>
          <span class="pagination-link active">1</span>
          <span class="pagination-link">2</span>
          <span class="pagination-link">3</span>
          <span class="pagination-link">4</span>
          <span class="pagination-link">5</span>
          <span class="pagination-link">Next</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      deleteAdvert(){
        this.$emit('confirm', {title: 'Advert Deletion', text: 'You are about to delete this advert, confirm your request below', button: 'Delete Advert'});
      }
    }
  }
</script>

<style>

</style>