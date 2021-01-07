<template>
  <div class="col-md-8 mx-auto trade-details">
    <div class="trade-details-header">
      <h6>Trade Details</h6>
    </div>
    <div class="trade-details-body row">
      <div class="col-md-6">
        <div class="trade-details-item start">
          <div class="key">{{ type === 'sell' ? 'Buyer' : 'Seller' }}:</div>
          <div class="value"><a href="#">devKunle</a></div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="trade-details-item">
          <div class="key">Coin:</div>
          <div class="value text-capitalize">{{ $store.getters.getActiveCurrency.name }} <img class="trade-details-coin-icon" :src="getImageURL($store.getters.getActiveCurrency.name)" alt="coin"></div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="trade-details-item">
          <div class="key">Amount {{ $store.getters.getActiveCurrency.abbr }}:</div>
          <div class="value text-capitalize">0.0675</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="trade-details-item">
          <div class="key">Amount USD:</div>
          <div class="value text-capitalize">98</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="trade-details-item">
          <div class="key">Amount NGN:</div>
          <div class="value text-capitalize">34,000</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="trade-details-item">
          <div class="key">Range:</div>
          <div class="value">0.005 - 100 {{ $store.getters.getActiveCurrency.abbr }}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="trade-details-item">
          <div class="key">Bank:</div>
          <div class="value">Access Bank PLC</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="trade-details-item">
          <div class="key">Account Name:</div>
          <div class="value">Swifthrive Test</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="trade-details-item">
          <div class="key">Account Number:</div>
          <div class="value">0967543543</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="trade-details-item">
          <div class="key">Status:</div>
          <div class="value text-warning">pending</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['type'],
    methods: {
      getImageURL(coin){
        if (coin === 'Bitcoin Cash'){
          return '../../../../assets/coins/bitcoin-cash.jpg';
        }else{
          return '../../../../assets/coins/'+coin.toLowerCase()+'.png';
        }
      }
    }
  }
</script>

<style>
  .trade-details-body{
    margin-top: 3px;
    padding: 25px 15px;
    color: #807e7e;
  }
  .trade-details-item{
    padding: 12px 0;
    display: flex;
    justify-content: start;
    font-size: 14px;
    border-top: 1px solid #efebeb;
  }
  .trade-details-item .key{
    width: 130px;
    font-weight: 500;
  }
  .trade-details-item .value{
    /*padding-left: 50px;*/
  }
  .trade-details-coin-icon{
    height: 20px;
    margin: 0 2px;
  }
  @media screen and (max-width: 600px) {
    .trade-details-body{
      padding: 5px 15px;
    }
    .trade-details-item.start{
      border-top: none;
    }
  }
</style>