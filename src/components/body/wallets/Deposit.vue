<template>
  <div class="page-container">
    <div class="row">
      <div class="col-md-8 mx-auto wallets-container">
        <div class="row">
          <div class="col-md-5 d-none d-md-block">
            <app-coin-list/>
          </div>
          <div class="col-md-7 text-center">
            <div class="deposit-info-wrapper">
              <div>
                Deposit <span class="text-uppercase">{{ $route.params.coin }}</span>
              </div>
              <hr>
              <app-qrcode :value="`12453677${$route.params.coin}48r3467${$route.params.coin}5i65237868${$route.params.coin}62635775e6`" :width="200" :color="{dark: '#1a1919', light: '#f5f0f0'}"/>
              <div class="wallet-address-wrapper">
                <div class="wallet-address">
                  ndgfdgxfjnmcdhmcsrytdfyqwehjfcsd
                </div>
                <div class="wallet-address-copy-btn">
                  <span class="copied-tip" :style="{'display': showCopied ? 'block' : 'none'}">Copied</span>
                  <button @click="copyToClipboard('ndgfdgxfjnmcdhmcsrytdfyqwehjfcsd')"><span class="fa fa-copy"></span></button>
                </div>
              </div>
              <div class="wallet-address-info">
                Scan wallet address using QRcode or copy and paste your address to depositor.
              </div>
              <div class="withdrawal-fee">
                Deposit fee: 0.0000005 <span class="text-uppercase">{{ $route.params.coin }}</span>
              </div>
            </div>
            <div class="transaction-history">
              <div class="mt-3">
                <span class="text-uppercase">{{ $route.params.coin }}</span> Deposit History
              </div>
              <hr>
              <div class="transaction-history-body">
                <div class="transaction-history">
                  <div v-for="index in 10" :key="index" class="transaction">
                    <div class="from">
                      <span class="font-weight-bold">From:</span> <span class="font-italic ml-md-4">shmcjhdbhcjhdgcjfduhcgsdtyj65373465</span>
                    </div>
                    <div class="amount">
                      <div><span class="font-weight-bold">Amount:</span> <span class="font-italic ml-md-1">0.004345 <span class="text-uppercase">{{ $route.params.coin }}</span></span></div>
                    </div>
                    <div class="status">
                      <span class="font-weight-bold">Status:</span> <span class="font-weight-bold text-success ml-md-3">Success</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueQrcode from 'vue-qrcode';
import CoinList from "@/components/body/wallets/partials/CoinList";
export default {
  data(){
    return{
      showCopied: false,
    }
  },
  created() {
    this.$store.commit('hideNavigations');
  },
  methods: {
    copyToClipboard(input){
      const tempInput = document.createElement("input");
      tempInput.value = input;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      this.showCopied = true;
      setTimeout(() => {
        this.showCopied = false;
      }, 1500);
    },
  },
  components: {
    appCoinList: CoinList,
    appQrcode: VueQrcode
  }
}
</script>

<style>
  .deposit-info-wrapper{
    margin: 20px 0;
    border-radius: 5px;
    background: #f5f0f0;
    color: #1a1919;
    padding: 15px 10px;
  }
  .transaction-history{
    border-radius: 5px;
    background: #f5f0f0;
    color: #1a1919;
    padding: 5px;
  }
  .transaction-history-body{
    padding: 5px 0;
    height: 300px;
    overflow-y: auto;
  }
  .transaction{
    background: #c4c4c4;
    padding: 10px 5px;
    border-radius: 5px;
    margin-top: 5px;
  }
  .from, .amount, .status{
    text-align: left;
    font-size: 13px;
  }
  .wallet-address-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wallet-address{
    font-size: 14px;
    background: #fff;
    padding: 12px 5px;
    border-radius: 3px;
    width: 300px;
    overflow-x: auto;
  }
  .wallet-address-copy-btn button{
    padding: 5px 10px;
    border: none;
    background: #f5f0f0;
    font-size: 23px;
  }
  .wallet-address-info{
    margin-top: 15px;
    font-size: 13px;
    padding: 5px 10px;
  }
  .withdrawal-fee{
    margin-top: 5px;
    font-size: 11px;
    font-weight: bold;
  }
  @media screen and (max-width: 500px) {
    .wallet-address{
      width: 240px;
    }
    .from, .amount, .status{
      text-align: left;
      font-size: 12px;
    }
    .transaction-history-body{
      padding: 5px 0;
      height: 100%;
    }
  }
</style>