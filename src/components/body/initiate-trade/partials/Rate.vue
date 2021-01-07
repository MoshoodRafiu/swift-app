<template>
  <div>
    <div v-if="!$store.getters.showTradeWindowLoader" class="row">
      <div class="col-12 mx-auto text-center">
        <span v-for="star in 5" :key="star" @mouseenter="setRating(star)" @click="selectRating(star)" @mouseleave="clearRating" :id="'star-rating-'+star" class="fa fa-star trade-rating-icon"></span>
      </div>
      <div class="col-12">
        <div class="text-center trade-page-details mt-3">Rate your transaction with devKunle<span class="font-italic" v-if="!!rating">: You rated <span class="font-weight-bold">devKunle</span><span class="font-weight-bold trade-user-rating"> {{ rating }}/5</span></span></div>
      </div>
      <div class="col-md-4 mx-auto">
        <div class="trade-action-btn-wrapper">
          <button class="trade-action-btn" :class="{'disabled': tradeCancelled}">
            Finish
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
      rating: null
    }
  },
  created() {
    this.$store.commit('setTradeWindowLoaderStatus', true);
    setTimeout(() => {
      this.$store.commit('setTradeWindowLoaderStatus', false);
    }, 1500)
  },
  methods: {
    setRating(star){
      this.clearStars();
      for (let i = 1; i < star+1; i++){
        document.getElementById('star-rating-'+i).classList.add('active');
      }
    },
    clearStars(){
      for (let i = 1; i < 6; i++){
        document.getElementById('star-rating-'+i).classList.remove('active');
      }
    },
    clearRating(){
      if (this.rating === null){
        this.clearStars();
      }else{
        console.log('Rating- '+this.rating)
        this.clearStars();
        this.setRating(this.rating);
      }
    },
    selectRating(star){
      this.rating = star;
      this.setRating(star);
    }
  }
}
</script>

<style>
  .trade-rating-icon{
    font-size: 40px;
    color: #cccccc;
  }
  .trade-rating-icon:hover{
    color: #ffc107;
  }
  .trade-rating-icon.active{
    color: #ffc107;
  }
  .trade-user-rating{
    font-size: 20px;
  }
  @media screen and (max-width: 400px){
    .trade-rating-icon{
      font-size: 35px;
    }
  }
</style>