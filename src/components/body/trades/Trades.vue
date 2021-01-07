<template>
  <div class="page-container">
    <div class="col-md-8 mx-auto trades-container">
      <div class="trades-header">
        <div class="trades-header-tab-header">
          <div class="trades-header-tab-item" :class="{'active': activeTab === 'pending'}" @click="changeTab('pending')">
            Pending Trades
          </div>
          <div class="trades-header-tab-item" :class="{'active': activeTab === 'history'}" @click="changeTab('history')">
            Trades History
          </div>
        </div>
      </div>
      <div class="trades-body" :class="{' d-flex align-items-center': false}">
        <app-loader/>
        <div class="trades-list">
          <div v-for="trade in 10" :key="trade" class="row trade-wrapper">
            <div class="col-md-3 trade-user-qty">
              <div>
                0.003465 BTC
              </div>
              <div class="trade-small-info">
                with <a href="#">devKunle</a>
              </div>
            </div>
            <div class="col-md-4 trade-amount">
              <div>
                1,020.55 USD at NGN 2,300,670.67
              </div>
              <div class="trade-small-info">
                450 per USD <span class="font-weight-bold trade-type bg-success">Buy</span>
              </div>
            </div>
            <div class="col-md-3">
              <div>
                2020-12-01
              </div>
              <div class="trade-small-info">
                at 10:20 am
              </div>
            </div>
            <div class="col-md-2 text-right my-auto">
              <div class="trade-button">
                <button :class="{'disabled': activeTab === 'history'}">Continue</button>
              </div>
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
  </div>
</template>

<script>
  import Loader from "@/components/body/loader/Loader";
  export default {
    data(){
      return{
        activeTab: 'pending'
      }
    },
    created() {
      this.$store.commit('hideNavigations');
    },
    methods: {
      changeTab(type){
        this.activeTab = type;
      }
    },
    components: {
      appLoader: Loader
    }
  }
</script>

<style>
  .trades-container{
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 25px #cccccc;
    padding: 5px;
  }
  .trades-header{
    padding: 10px;
  }
  .trades-body{
    padding: 20px;
    min-height: 400px;
  }
  .trade-wrapper{
    padding: 10px;
    border: 1px solid #517cef;
    border-radius: 5px;
    color: #807e7e;
    font-size: 13px;
    margin-bottom: 20px;
  }
  .trade-small-info{
    font-size: 11px;
  }
  .trade-button button{
    padding: 5px 10px;
    border-radius: 3px;
    background: white;
    color: #1641b5;
    border: 1px solid #1641b5;
    font-weight: 400;
  }
  .trade-type{
    padding: 1px 5px;
    border-radius: 3px;
    color: white;
    margin-left: 5px;
    cursor: pointer;
  }
  .trade-button button.disabled,
  .trade-button button.disabled:hover{
    border: none !important;
    color: #ffffff !important;
    background: #cccccc !important;
    cursor: not-allowed;
  }
  .trade-button button:hover{
    border: none;
    background: linear-gradient(155deg, #1641b5, #2ef3e4);
    -webkit-text-fill-color: #ffffff;
  }
  .trade-button button:focus{
    outline: none;
  }
  .trades-header-tab-header{
    display: flex;
    border-bottom: 1px solid #f3f1f1;
  }
  .trades-header-tab-item{
    background: #e7e6e6;
    padding: 10px 30px;
    margin-right: 2px;
    border-radius: 10px 10px 0 0;
    font-size: 13px;
    cursor: pointer;
  }
  .trades-header-tab-item.active{
    background: linear-gradient(155deg, #1641b5, #2ef3e4);
    -webkit-text-fill-color: #ffffff;
  }
  @media screen and (max-width: 767px){
    .trade-user-qty,
    .trade-amount{
      padding-bottom: 10px;
    }
    .trade-wrapper{
      padding: 10px 0;
    }
    .trade-button button.disabled{
      display: none;
    }
    .trades-header-tab-item{
      padding: 10px 20px;
    }
  }
  @media screen and (max-width: 767px){
    .trade-user-qty,
    .trade-amount{
      padding-bottom: 10px;
    }
    .trade-wrapper{
      padding: 10px 0;
    }
    .trade-button button.disabled{
      display: none;
    }
    .trades-header-tab-item{
      padding: 10px 20px;
    }
  }
  @media screen and (max-width: 400px){
    .trades-header-tab-item{
      padding: 10px 12px;
    }
  }
</style>
