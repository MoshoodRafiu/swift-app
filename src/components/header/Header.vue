<template>
  <div>
    <header>
<!--      <app-navbar/>-->
      <div class="row header-section-main">
        <div class="col-md-6 header-section header-section-text">
          <div>
            <h1>Buy and sell cryptocurrencies at <span class="text-emphasis">zero risk.</span></h1>
            <p>The fastest and safest platform to trade cryptocurrencies.</p>
          </div>
        </div>
        <div class="col-md-5 header-section header-section-form mx-auto">
          <div class="header-section-form-wrapper">
            <slide-up-down :active="showAmountField" :duration="200">
              <div class="qty-input">
                <input v-model="coinAmount" id="qty-input" placeholder="0.00" type="number" class="qty-input-field" autofocus="autofocus">
              </div>
            </slide-up-down>
            <div v-if="!showAmountField && coinAmount" class="coin-amount">{{ numberFormat(coinAmount, true) }} <span>{{ $store.getters.getActiveCurrency.abbr }}</span> <span class="mx-1">~</span> {{ numberFormat(coinAmount * 4000, false) }} USD</div>
            <div class="dropdown">
              <div class="dropdown-select">
                <span class="select">
                  <img class="currency-img" :src="getImageURL($store.getters.getActiveCurrency.name)" :alt="$store.getters.getActiveCurrency.name">
                  {{ $store.getters.getActiveCurrency.name }}
                </span>
                <i class="fa fa-caret-down select-icon"></i>
                <div @click="toggleAmountFieldDisplay" id="qty-button" @mouseenter="disableCoinType" @mouseleave="enableCoinType" class="qty-button">
                  <span id="qty-button-text">Qty</span>
                </div>
              </div>
              <div class="dropdown-list" :class="{'disabled': coinTypeDisabled}">
                <div @click="$store.commit('setActiveCurrency', currency)" class="dropdown-list-wrapper" v-for="currency in $store.getters.getCurrencies" :key="currency.name">
                  <img v-if="currency.name !== $store.getters.getActiveCurrency.name" class="currency-img" :src="getImageURL(currency.name)" :alt="currency.name">
                  <div class="dropdown-list-item" v-if="currency.name !== $store.getters.getActiveCurrency.name">{{ currency.name }}</div>
                </div>
              </div>
            </div>
            <div class="header-buttons">
              <button @click="scrollToSection('buy')" class="button buy">Buy</button>
              <button @click="scrollToSection('sell')" class="button sell">Sell</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
// import Navbar from "./Navbar";
export default {
  data(){
    return{
      coinAmount: '',
      showAmountField: false,
      coinTypeDisabled: false
    }
  },
  created() {
    window.addEventListener('click', (event) => {
      if ((event.target.id !== 'qty-input') && (event.target.id !== 'qty-button') && (event.target.id !== 'qty-button-text')){
        this.hideAmountFieldDisplay();
      }
    })
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30 && window.innerWidth > 767){
        this.$store.commit('setSticky', true);
      }else{
        this.$store.commit('setSticky', false);
      }
    });
    this.addStickyClass();
  },
  methods: {
    numberFormat(amount, isCoin, decimal = ".", thousands = ",") {
      try {
        amount = Number.parseFloat(amount);
        let decimalCount;
        if (isCoin){
          decimalCount = Number.isInteger(amount) ? 0 : amount.toString().split('.')[1].length;
        }else{
          decimalCount = Number.isInteger(amount) ? 0 : 2;
        }
        const negativeSign = amount < 0 ? "-" : "";
        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      }
    },
    scrollToSection(section){
      const element = document.getElementById(section);
      element.scrollIntoView({ behavior: 'smooth' });
    },
    addStickyClass(){
      if (window.innerWidth < 767){
        this.$store.commit('setSticky', true);
      }
    },
    toggleAmountFieldDisplay(){
      this.showAmountField = !this.showAmountField;
    },
    hideAmountFieldDisplay(){
      this.showAmountField = false;
    },
    disableCoinType(){
      this.coinTypeDisabled = true;
    },
    enableCoinType(){
      this.coinTypeDisabled = false;
    },
    getImageURL(coin){
      if (coin === 'Bitcoin Cash'){
        return '../../assets/coins/bitcoin-cash.jpg';
      }else{
        return '../../assets/coins/'+coin.toLowerCase()+'.png';
      }
    }
  },
  components: {
    // AppNavbar: Navbar
  }
}
</script>

<style scoped>
  header{
    min-height: 100vh;
    background: linear-gradient(rgba(29, 28, 152, 0.9), rgba(29, 28, 152, 0.9)), url("../../assets/header.svg") center/cover;
    width: 100% !important;
    overflow-x: hidden;
  }
  .navbar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: block;
    transition: 0.4s;
    z-index: 9999;
    padding: 0;
  }
  .navbar.sticky{
    background: #1D1C98;
  }
  .nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.4s;
  }
  .wallet-balance{
    background: #07236e;
    color: #ffffff;
    border-bottom: 1px solid rgba(0, 97, 165, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    font-size: 12px;
    font-weight: 500;
  }
  .brand-name, .nav-links{
    padding: 20px 60px;
    color: #ffffff;
  }
  .brand-name img{
    width: 30px;
    margin-right: 7px;
  }
  .brand-name{
    font-weight: bold;
    font-size: 25px;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text-emphasis{
    color: #2bffae;
  }
  .nav-links ul{
    margin: 0;
  }
  .nav-links ul li{
    display: inline;
    padding: 10px 20px;
  }
  .nav-links ul li a{
    text-decoration: none;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 1px;
  }
  .nav-links ul li a:hover, .nav-links ul li.active a{
    color: #2bffae;
  }
  .header-section-main{
    padding: 30px 20px;
    min-height: 100vh;
    overflow: hidden !important;
  }
  .header-section{
    display: flex;
    align-self: center;
    padding: 70px;
  }
  .header-section-text div h1{
    color: #ffffff;
    font-size: 40px;
    font-weight: bold;
  }
  .header-section-text div p{
    margin-top: 5px;
    color: #ffffff;
    font-size: 20px;
    letter-spacing: 1px;
  }
  .header-section-form{
    justify-content: center;
  }
  .dropdown{
    width: 100%;
    position: relative;
    color: #807e7e;
  }
  .qty-input{
    width: 100%;
    position: relative;
    color: #807e7e;
    margin-bottom: 10px;
  }
  .qty-input-field{
    padding: 1rem;
    border-radius: 5px;
    background-color: #ffffff;
    width: 100%;
    font-size: 1.2rem;
    cursor: pointer;
    border: none;
  }
  .qty-input-field:focus{
    outline: none;
  }
  .dropdown:hover .dropdown-list{
    opacity: 1;
    visibility: visible;
  }
  .dropdown:hover .dropdown-list.disabled{
    opacity: 0;
    visibility: hidden;
  }
  .currency-img{
    width: 35px;
    margin-right: 5px;
  }
  .dropdown-select{
    padding: 1rem;
    border-radius: 5px;
    background-color: #ffffff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.6rem;
    cursor: pointer;
  }
  .coin-amount{
    color: #2bffae;
  }
  .select-icon{
    margin-right: 5.2rem;
  }
  .qty-button{
    position: absolute;
    top: 5%;
    right: 4px;
    background: #163996;
    color: #ffffff;
    width: 5rem;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
  }
  .dropdown-list{
    border-radius: 5px;
    background-color: #ffffff;
    position: absolute;
    top: 90px;
    width: 100%;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s linear, visibility 0.3s linear;
    z-index: 9999999;
  }
  .dropdown-list-wrapper{
    padding: 0 1.5rem;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .dropdown-list-item{
    padding: 1rem 1.5rem 1rem 0.4rem;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .header-buttons{
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .button{
    padding: 25px 70px;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    font-size: 17px;
  }
  .button.buy{
    background: green;
    margin-right: 10px;
  }
  .button.sell{
    background: #d60c1e;
    margin-left: 10px;
  }
  .button:focus{
    outline: none;
  }
  .toggle-drop-down{
    font-size: 24px;
    color: #2bffae;
    display: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
  @media screen and (max-width: 900px) {
    .nav-links ul{
      opacity: 0;
      visibility: hidden;
      position: absolute;
      top: 80px;
      left: 0;
      width: 100%;
      background: rgba(29, 28, 152, 0.95);
      transition: opacity 0.4s linear, visibility 0.4s linear;
    }
    .nav-links ul.toggled{
      opacity: 1;
      visibility: visible;
    }
    .nav-links ul li{
      display: block;
      padding: 20px 70px;
    }
    .toggle-drop-down{
      display: block;
    }
    .header-section-text div h1{
      font-size: 36px;
    }
    .button{
      padding: 20px 50px;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 767px) {
    .header-section-text div h1{
      font-size: 36px;
    }
    .header-section-main{
      overflow: auto;
    }
    .button{
      padding: 25px 70px;
      font-size: 16px;
    }
    .header-section{
      padding: 20px 70px;
    }
    .header-section-text{
      justify-content: center;
      margin-top: 140px;
    }
    .dropdown-list{
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 500px) {
    .navbar{
      background: #1D1C98 !important;
    }
    .brand-name, .nav-links{
      padding: 20px 30px;
    }
    .header-section-text div h1{
      font-size: 28px;
    }
    .header-section-text div p{
      font-size: 12px;
    }
    .nav-links ul{
      top: 100px;
    }
    .nav-links ul li{
      padding: 20px 30px;
    }
    .button{
      padding: 20px 55px;
      font-size: 16px;
    }
    .header-section{
      padding: 20px 30px;
    }
    .header-section-text{
      justify-content: center;
      margin-top: 110px;
    }
    .dropdown{
      margin-top: 20px;
      width: auto;
      position: relative;
    }
    .dropdown-select{
      padding: 1rem;
      width: auto;
      font-size: 1rem;
      font-weight: 500;
    }
    .dropdown-list{
      top: 70px;
    }
    .dropdown-list-item{
      padding: 1rem 1rem 1rem 0;
      font-size: 1rem;
      font-weight: 500;
    }
    .wallet-balance{
      display: block;
      padding: 5px 10px;
      font-size: 10px;
    }
    .coin-amount{
      margin-bottom: -17px;
    }
  }
  @media screen and (max-width: 350px) {
    .brand-name, .nav-links{
      padding: 15px 20px;
    }
    .header-section-text div h1{
      font-size: 28px;
    }
    .button{
      padding: 15px 45px;
      font-size: 16px;
    }
    .header-section{
      padding: 20px 30px;
    }
    .header-section-text{
      justify-content: center;
      margin-top: 120px;
    }
    .dropdown{
      margin-top: 20px;
      width: auto;
      position: relative;
    }
    .dropdown-select{
      padding: 1.3rem;
      width: auto;
      font-size: 1.2rem;
    }
    .dropdown-list{
      top: 80px;
    }
    .dropdown-list-item{
      padding: 1rem 1.5rem 1rem 0;
      font-size: 1.2rem;
    }
  }
</style>