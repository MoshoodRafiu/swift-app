<template>
  <div class="row">
      <div class="col-md-6 p-0 my-2">
        <div class="col-md-12 ml-1">
          <div class="ad-section-header">Advert Type</div>
        </div>
        <div class="col-md-12">
          <div class="selection-wrapper">
            <div class="selection-option buy" @click="setAdvertType('buy')" :class="{'active': advert.type === 'buy'}">Buy</div>
            <div class="selection-option sell" @click="setAdvertType('sell')" :class="{'active': advert.type === 'sell'}">Sell</div>
          </div>
        </div>
      </div>
      <div class="col-md-6 p-0 my-2">
        <div class="col-md-12 ml-1">
          <div class="ad-section-header">Coin Type</div>
        </div>
        <div class="col-md-12">
          <div class="selection-wrapper">
            <div class="selection-option coin" @click="setCoinType('btc')" :class="{'active': advert.coin === 'btc'}">
              <img class="advert-coin-img" src="../../../assets/coins/btc.svg" alt="btc"></div>
            <div class="selection-option coin" @click="setCoinType('eth')" :class="{'active': advert.coin === 'eth'}">
              <img class="advert-coin-img" src="../../../assets/coins/eth.svg" alt="eth"></div>
            <div class="selection-option coin" @click="setCoinType('ltc')" :class="{'active': advert.coin === 'ltc'}">
              <img class="advert-coin-img" src="../../../assets/coins/ltc.svg" alt="ltc"></div>
            <div class="selection-option coin" @click="setCoinType('bch')" :class="{'active': advert.coin === 'bch'}">
              <img class="advert-coin-img" src="../../../assets/coins/bch.svg" alt="bch"></div>
            <div class="selection-option coin" @click="setCoinType('xrp')" :class="{'active': advert.coin === 'xrp'}">
              <img class="advert-coin-img" src="../../../assets/coins/xrp.svg" alt="xrp"></div>
          </div>
        </div>
      </div>
      <div class="col-md-12 mt-2 ml-1">
        <div class="ad-section-header">Transaction Range</div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6 mt-1">
            <div class="">
              <label for="from" class="mx-1"><span v-if="!!advert.type">I want to {{ advert.type }} {{ advert.coin ? advert.coin.toUpperCase() : '' }} from</span><span v-else>From</span></label>
              <input id="from" type="number" v-model="advert.min" class="trade-form-control" placeholder="e.g 0.0005">
            </div>
          </div>
          <div class="col-md-6 mt-1">
            <div class="">
              <label for="to" class="mx-1">To</label>
              <input id="to" type="number" v-model="advert.max" class="trade-form-control" placeholder="e.g 0.05">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 p-0">
        <div class="col-md-12 mt-4 ml-1">
          <div class="ad-section-header">Transaction Rate</div>
        </div>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12 mt-1">
              <div class="">
                <label for="rate"></label>
                <input id="rate" type="number" v-model="advert.rate" class="trade-form-control" placeholder="e.g 450">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 p-0">
        <div class="col-md-12 mt-4 ml-1">
          <div class="ad-section-header">Transaction Duration <span class="small">(in Minutes)</span></div>
        </div>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12 mt-1">
              <div class="">
                <label for="duration"></label>
                <input id="duration" v-model="advert.duration" type="number" class="trade-form-control" placeholder="e.g 5">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!!advert.type" class="col-md-12 mt-4 p-0">
        <div class="col-md-12 ml-1">
          <div class="ad-section-header">Payment Details</div>
        </div>
        <div v-if="advert.type === 'buy'" class="col-md-12">
          <div class="row">
            <div class="col-md-6 mt-1">
              <div class="">
                <label for="company" class="mx-1">Company</label>
                <input id="company" type="text" disabled class="trade-form-control" value="Swifthrive">
              </div>
            </div>
            <div class="col-md-6 mt-1">
              <div class="">
                <label for="via" class="mx-1">via</label>
                <input id="via" type="text" disabled class="trade-form-control" :value="`Swifthrive ${advert.coin ? advert.coin.toUpperCase()+' ' : ''}Wallet`">
              </div>
            </div>
          </div>
        </div>
        <div v-if="advert.type === 'sell'" class="col-md-12">
          <div class="row">
            <div class="col-md-6 mt-1">
              <div class="">
                <label for="bankName" class="mx-1">Bank Name</label>
                <select id="bankName" v-model="advert.bankName" class="trade-form-control">
                  <option value="">Select Bank</option>
                  <option value="Access Bank PLC">Access Bank PLC</option>
                </select>
              </div>
            </div>
            <div class="col-md-6 mt-1">
              <div class="">
                <label for="accountNumber" class="mx-1">Account Number</label>
                <input id="accountNumber" v-model="advert.accountNumber" type="text" class="trade-form-control" placeholder="Account Number">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 ml-1 mt-4">
        <div class="ad-section-header">Set Advert Status</div>
      </div>
      <div class="col-md-12">
        <div class="selection-wrapper">
          <div class="selection-option active-ad" @click="setAdvertStatus('active')" :class="{'active': advert.status === 'active'}">Active</div>
          <div class="selection-option disabled-ad" @click="setAdvertStatus('disabled')" :class="{'active': advert.status === 'disabled'}">Disabled</div>
        </div>
      </div>
      <div class="col-md-12 ml-1 mt-3">
        <div class="ad-section-header">Advert Preview </div>
      </div>
      <div class="col-md-12 advert small preview" :class="{'buy': advert.type === 'buy', 'sell': advert.type === 'sell'}">
        <div class="row">
          <div class="col-md-3 user">
            <div>
              devKunle <span v-if="advert.duration" class="advert-duration">({{ advert.duration }} min)</span>
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
            <div class="advert-price" v-if="!!(advert.rate && advert.coin)">
              8,566,657.55 <span class="currency">NGN Per {{ advert.coin ? advert.coin.toUpperCase() : '' }}</span>
            </div>
            <div v-if="!!advert.max" class="advert-max advert-range">
              Min:{{ advert.min }} - Max: {{ advert.max }}
            </div>
          </div>
          <div class="col-md-4 bank">
            <div v-if="advert.type === 'sell'">
              {{ advert.bankName }}
            </div>
            <div v-if="advert.type === 'buy'">
              Swifthrive {{ advert.coin ? advert.coin.toUpperCase() : '' }} Wallet
            </div>
            <div v-if="!!advert.rate" class="advert-rate">
              Rate: {{ advert.rate }} Per NGN
            </div>
          </div>
          <div class="col-md-2">
            <div class="advert-button d-md-block d-none">
              <button :class="{'advert-button-buy': advert.type === 'buy', 'advert-button-sell': advert.type === 'sell'}" class="text-capitalize" disabled>{{ advert.type }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 ad-action-button-wrapper pt-3">
        <div class="row">
          <div class="col-md-4 p-0 ml-auto">
            <button class="trade-action-btn">{{ !isEditing ? 'Create' : 'Update' }} Advert</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: ['isEditing'],
    data(){
      return{
        advert: {
          type: null,
          coin: null,
          min: null,
          max: null,
          rate: null,
          duration: null,
          bankName: '',
          accountNumber: null,
          status: 'active'
        }
      }
    },
    methods: {
      setAdvertType(type){
        this.advert.type = type;
      },
      setCoinType(type){
        this.advert.coin = type;
      },
      setAdvertStatus(type){
        this.advert.status = type;
      }
    }
  }
</script>

<style>
  .advert-duration{
    font-size: 8px;
    font-style: italic;
  }
  .advert.preview{
    background: #f5f1f1;
  }
  .ad-section-header{
    font-size: 14px;
    color: #807e7e;
    font-weight: 500;
  }
  .selection-wrapper{
    display: flex;
    align-items: center;
  }
  select.trade-form-control{
    background: white;
  }
  .selection-option{
    padding: 10px 20px;
    background: #e7e6e6;
    font-size: 13px;
    margin: 10px 0;
    cursor: pointer;
    border-right: 1px solid #cccccc;
  }
  .selection-option:first-child{
    border-radius: 5px 0 0 5px;
  }
  .selection-option:last-child{
    border-radius: 0 5px 5px 0;
    border: none;
  }
  .selection-option.active-ad.active,
  .selection-option.active-ad:hover,
  .selection-option.buy.active,
  .selection-option.buy:hover{
    background: #22cf22;
    color: white;
  }
  .selection-option.disabled-ad.active,
  .selection-option.disabled-ad:hover,
  .selection-option.coin.active,
  .selection-option.coin:hover{
    background: #807e7e;
    color: white;
  }
  .selection-option.sell.active,
  .selection-option.sell:hover{
    background: #d60c1e;
    color: white;
  }
  .advert-coin-img{
    height: 20px;
  }
  .ad-action-button-wrapper{
    border-top: 1px solid #cccccc;
  }
  @media screen and (max-width: 500px) {
    .selection-option{
      padding: 10px 15px;
    }
  }
  @media screen and (max-width: 250px) {
    .advert-coin-img{
      height: 17px;
    }
  }
</style>