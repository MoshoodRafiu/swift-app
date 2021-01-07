<template>
  <div>
    <app-header/>
    <section>
      <div class="row">
        <h1 class="col-md-8 section-header">Trade with ease on Swift<span class="text-emphasis">hrive.</span></h1>
      </div>
      <div class="row card-group">
        <div class="col-md-3 col-sm-6 mx-auto">
          <div class="app-card">
            <div class="app-card-icon">
              <span class="fab fa-bitcoin icon"></span>
            </div>
            <div class="app-card-title">
              Buy Cryptocurrencies
            </div>
            <div class="app-card-detail">
              <p>Buy any type of cryptocurrency from anybody, anywhere in the world, and receive your coins in less than 20 minutes at zero risk.</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mx-auto">
          <div class="app-card">
            <div class="app-card-icon">
              <span class="fa fa-donate icon"></span>
            </div>
            <div class="app-card-title">
              Sell Cryptocurrencies
            </div>
            <div class="app-card-detail">
              Sell your cryptocurrencies at best rate to any verified vendor and get instant payment in less than 20 minutes.
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mx-auto">
          <div class="app-card">
            <div class="app-card-icon">
              <span class="fa fa-wallet icon"></span>
            </div>
            <div class="app-card-title">
              Store Cryptocurrencies
            </div>
            <div class="app-card-detail">
              Store your cryptocurrencies in any of our secured digital wallets
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mx-auto">
          <div class="app-card">
            <div class="app-card-icon">
              <span class="fa fa-chart-line icon"></span>
            </div>
            <div class="app-card-title">
                Real-time market data
            </div>
            <div class="app-card-detail">
              Get up-to-date market information and exchange rates of over 200 cryptocurrencies.
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="buy" class="adverts-section buy">
      <div class="row">
        <h1 class="col-md-8 section-header">Buy {{ $store.getters.getActiveCurrency.name }}</h1>
      </div>
      <div>
        <div v-for="advert in 7" :key="advert" class="advert buy">
          <div class="row" @click="navigateToBuyCoin('buy')">
            <div class="col-md-3 user">
              <div>
                devKunle
              </div>
              <div>
                <div class="rating">
                  <span class="fa fa-star mr-1 active"></span>
                  <span class="fa fa-star mr-1 active"></span>
                  <span class="fa fa-star mr-1 active"></span>
                  <span class="fa fa-star mr-1 active"></span>
                  <span class="fa fa-star mr-1"></span>
                </div>
              </div>
            </div>
            <div class="col-md-3 amount">
              <div class="advert-price">
                8,566,657.55 <span class="currency">NGN Per {{ $store.getters.getActiveCurrency.abbr }}</span>
              </div>
              <div class="advert-max">
                Max: 0.0004563
              </div>
            </div>
            <div class="col-md-4 bank">
              <div>
                Access Bank PLC
              </div>
              <div class="advert-rate">
                Rate: 450 Per NGN
              </div>
            </div>
            <div class="col-md-2 d-md-block d-none">
              <div class="advert-button">
                <button @click="$router.push({name: 'buy', params: {coin: $store.getters.getActiveCurrency.abbr.toLowerCase()}})" class="advert-button-buy">Buy</button>
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
    </section>
    <section id="sell" class="adverts-section sell">
      <div class="row">
        <h1 class="col-md-8 section-header">Sell {{ $store.getters.getActiveCurrency.name }}</h1>
      </div>
      <div>
        <div v-for="advert in 7" :key="advert" class="advert sell">
          <div class="row" @click="navigateToBuyCoin('sell')">
            <div class="col-md-3 user">
              <div>
                devKunle
              </div>
              <div>
                <div class="rating">
                  <span class="fa fa-star mr-1 active"></span>
                  <span class="fa fa-star mr-1 active"></span>
                  <span class="fa fa-star mr-1 active"></span>
                  <span class="fa fa-star mr-1 active"></span>
                  <span class="fa fa-star mr-1"></span>
                </div>
              </div>
            </div>
            <div class="col-md-3 amount">
              <div class="advert-price">
                8,566,657.55 <span class="currency">NGN Per {{ $store.getters.getActiveCurrency.abbr }}</span>
              </div>
              <div class="advert-max">
                Max: 0.0004563
              </div>
            </div>
            <div class="col-md-4 bank">
              <div>
                Access Bank PLC
              </div>
              <div class="advert-rate">
                Rate: 450 Per NGN
              </div>
            </div>
            <div class="col-md-2">
              <div class="advert-button d-md-block d-none">
                <button @click="$router.push({name: 'sell', params: {coin: $store.getters.getActiveCurrency.abbr.toLowerCase()}})" class="advert-button-sell">Sell</button>
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
    </section>
  </div>
</template>

<script>
  import Header from "@/components/header/Header";
  export default {
    created() {
      this.$store.commit('hideNavigations');
    },
    methods: {
      navigateToBuyCoin(type){
        if (window.innerWidth <= 768){
          this.$router.push({name: type, params: {coin: this.$store.getters.getActiveCurrency.abbr.toLowerCase()}});
        }
      }
    },
    components: {
      AppHeader: Header
    }
  }
</script>

<style>
  section{
    padding: 60px;
  }
  .section-header{
    font-size: 40px;
    color: #1641b5;
  }
  .text-emphasis{
    color: #2bffae;
  }
  .app-card{
    text-align: left;
    margin-top: 50px;
  }
  .app-card .app-card-icon{
    background: linear-gradient(135deg, #1641b5, #63fff3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 5px;
  }
  .app-card .app-card-icon .icon{
    font-size: 55px;
  }
  .app-card .app-card-title{
    font-size: 17px;
    padding: 20px 0 5px 0;
    font-weight: bold;
    color: #1641b5;
  }
  .app-card .app-card-detail{
    color: #807e7e;
  }
  .card-group{
    padding: 40px 0;
  }
  .adverts-section{
    background: #F9FAFB;
  }
  .adverts-section.sell{
    padding-bottom: 60px;
  }
  .advert{
    background: #ffffff;
    border-left: 5px solid #1d1c98;
    padding: 20px;
    color: #807e7e;
    font-weight: 400;
    margin: 20px 0;
  }
  .pagination{
    padding: 20px;
  }
  .pagination-wrapper{
    width: auto;
  }
  .pagination-link{
    padding: 5px 10px;
    margin-left: 3px;
    background: linear-gradient(135deg, #1641b5, #63fff3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border: 1px solid rgba(22, 65, 181, 0.4);
    transition: background-color 0.9s linear;
    border-radius: 3px;
    font-size: 12px;
  }
  .pagination-link:hover, .pagination-link.active{
    background: linear-gradient(135deg, #1641b5, #63fff3);
    -webkit-text-fill-color: #ffffff;
  }
  .advert.buy{
    border-left: 5px solid green;
  }
  .advert.sell{
    border-left: 5px solid #d60c1e;
  }
  .advert div{
    align-items: center;
  }
  .advert-price{
    font-weight: 600;
  }
  .advert-max, .advert-rate, .rating{
    margin-top: 10px;
    font-size: 13px;
  }
  .rating .active{
    color: #ffbf00;
  }
  .rating span{
    color: #d5d5d7;
  }
  .currency{
    color: #1d1c98;
  }
  .advert-button{
    text-align: right;
  }
  .advert-button button{
    padding: 5px 12px;
    border: none;
    color: white;
    border-radius: 3px;
    outline: none;
  }
  .advert-button-buy{
    background: linear-gradient(135deg, green, #63fff3);
  }
  .advert-button-sell{
    background: linear-gradient(135deg, #d60c1e, #ffb0b5);
  }
  @media screen and (max-width: 900px){
    section{
      padding: 30px;
    }
    .app-card .app-card-icon{
      margin-left: 30px;
    }
  }
  @media screen and (max-width: 767px){
    .advert{
      padding: 10px 20px;
    }
    .pagination{
      padding: 10px 20px;
    }
    .advert div{
      align-items: center;
    }
    .advert-price{
      font-weight: 600;
    }
    .user, .amount{
      margin-bottom: 7px;
    }
    .advert-max, .advert-rate, .rating{
      margin-top: 3px;
      font-size: 13px;
    }
    .rating .active{
      color: #ffbf00;
    }
    .rating span{
      color: #d5d5d7;
    }
    .currency{
      color: #1d1c98;
    }
    .advert-button{
      text-align: right;
    }
    .advert-button button{
      padding: 5px 12px;
      border: none;
      color: white;
      border-radius: 3px;
      outline: none;
    }
  }
  @media screen and (max-width: 500px){
    section{
      padding: 20px;
    }
    .section-header{
      margin-top: 50px;
      font-size: 34px;
      text-align: center;
    }
    .app-card{
      text-align: center;
    }
    .app-card .app-card-icon{
      margin-left: 0;
    }
  }
</style>