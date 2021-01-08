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
                Withdraw <span class="text-uppercase">{{ $route.params.coin }}</span>
              </div>
              <hr>
              <app-scanner v-if="scanningAddress" @close="scanningAddress = false" @scanComplete="getScannedAddress"/>
              <div class="withdrawal-info-wrapper">
                <div>
                  <div class="trade-form-group">
                    <label for="wallet"></label>
                    <input id="wallet" type="text" class="trade-form-control" v-model="withdrawalDetails.address" :placeholder="`${$route.params.coin.toUpperCase()} Address`">
                    <button @click="scanningAddress = true" class="trade-max-btn"><span class="fa fa-qrcode px-2"></span></button>
                  </div>
                </div>
                <div>
                  <label for="amount-coin"></label>
                  <div class="withdrawable-details">Withdrawable: 0.0065 {{ $route.params.coin.toUpperCase() }}</div>
                  <div class="trade-form-group">
                    <input id="amount-coin" type="number" v-model="withdrawalDetails.amount" class="trade-form-control" placeholder="Amount">
                    <button class="trade-max-btn">Max</button>
                  </div>
                </div>
                <div class="trade-action-btn-wrapper">
                  <button class="trade-action-btn" @click="withdrawCoin">
                    {{ `Withdraw ${this.$route.params.coin.toUpperCase()}` }}
                  </button>
                </div>
              </div>
              <div class="withdrawal-fee">
                Withdrawal fee: 0.0000005 <span class="text-uppercase">{{ $route.params.coin }}</span>
              </div>
            </div>
            <div class="transaction-history">
              <div class="mt-3">
                <span class="text-uppercase">{{ $route.params.coin }}</span> Withdrawal History
              </div>
              <hr>
              <div class="transaction-history-body">
                <div class="transaction-history">
                  <div v-for="index in 10" :key="index" class="transaction">
                    <div class="from">
                      <span class="font-weight-bold">Dest:</span> <span class="font-italic ml-md-4">shmcjhdbhcjhdgcjfduhcgsdtyj65373465</span>
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
import Scanner from "@/components/body/wallets/partials/Scanner";
import CoinList from "@/components/body/wallets/partials/CoinList";
export default {
  data(){
    return{
      showCopied: false,
      scanningAddress: false,
      withdrawalDetails: {
        address: '',
        amount: ''
      }
    }
  },
  created() {
    this.$store.commit('hideNavigations');
  },
  methods: {
    withdrawCoin(){
      if (!!this.withdrawalDetails.address && !!this.withdrawalDetails.amount){
        let data = {title: 'Withdrawal Confirmation', text: 'You are withdrawing '+this.withdrawalDetails.amount+' '+this.$route.params.coin.toUpperCase()+' to '+this.withdrawalDetails.address+', a total of '+parseFloat(this.withdrawalDetails.amount + 3) +' '+this.$route.params.coin.toUpperCase(), button: 'Withdraw'};
        this.showConfirmModal(data);
      }
    },
    showConfirmModal (data) {
      this.$modal.show('dialog', {
        title: data.title,
        text: data.text,
        buttons: [
          {
            title: 'Close',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: data.button,
            handler: () => {
              alert('Repost action')
            }
          }
        ]
      })
    },
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
    getScannedAddress(value){
      this.scanningAddress = false;
      this.withdrawalDetails.address = value.address;
    }
  },
  components: {
    appCoinList: CoinList,
    appScanner: Scanner
  }
}
</script>

<style>
.withdrawal-info-wrapper{
  margin: 0;
  border-radius: 5px;
  background: #f5f0f0;
  color: #1a1919;
  padding: 30px 10px;
}
.withdrawable-details{
  padding: 3px;
  font-size: 10px;
  text-align: right;
  color: red;
  font-weight: 500;
}
</style>