<template>
  <div class="page-container">
    <div class="row">
      <div class="col-md-8 mx-auto wallets-container">
        <div class="row">
          <div class="col-md-5">
            <app-coin-list/>
          </div>
          <div class="col-md-7 text-center d-none d-md-block">
            <img src="../../../assets/wallet.svg" class="wallet-img" alt="wallet">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CoinList from "@/components/body/wallets/partials/CoinList";
  export default {
    created() {
      this.$store.commit('hideNavigations');
    },
    components: {
      appCoinList: CoinList
    }
  }
</script>

<style>
  .wallets-container{
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 25px #cccccc;
    padding: 20px 15px;
  }
  .wallet-coin{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .wallet-coin-name{
    font-size: 16px;
    color: #807e7e;
  }
  .wallet-coin-logo{
    width: 30px;
  }
  .wallet-coin-container{
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    margin: 20px 0;
  }
  .wallet-coin-balance{
    font-size: 12px;
    color: #807e7e;
    margin-top: 10px;
    padding-bottom: 3px;
    text-align: right;
  }
  .wallet-action-btn-container{
    border-top: 1px solid #f3f1f1;
    padding-top: 7px;
    text-align: right;
  }
  .wallet-action-btn{
    margin: 5px;
    padding: 5px 10px;
    font-size: 12px;
    border: none;
    background: transparent;
    border-radius: 3px;
    font-weight: 400;
  }
  .wallet-action-btn.deposit{
    background: #22cf22;
    color: white;
  }
  .wallet-action-btn.deposit:hover{
    background: #17ab17;
    color: white;
  }
  .wallet-action-btn.withdraw{
    background: #f61d31;
    color: white;
  }
  .wallet-action-btn.withdraw:hover{
    background: #d60c1e;
    color: white;
  }
  .wallet-action-btn:focus{
    outline: none;
  }
  .wallet-img{
    width: 80%;
    margin-top: 150px;
  }
</style>