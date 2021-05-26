<template>
  <div class="page-container">
    <h5 class="trade-page-title">Buy <span class="text-lowercase">{{ $store.getters.getActiveCurrency.name }}</span> from devKunle</h5>
    <div class="col-md-8 mx-auto trade-tabs">
        <div class="trade-tab-header-wrapper">
          <div class="trade-tab-header">
            <div class="trade-tab-header-item-wrapper" @click="switchToAmountTab">
              <div class="trade-tab-header-item-text start">1. Amount</div>
              <div class="trade-tab-header-item start complete" :class="{'waiting': activeComponent === 'app-amount'}"></div>
            </div>
            <div class="trade-tab-header-item-wrapper" @click="switchToPaymentTab">
              <div class="trade-tab-header-item-text">2. Payment</div>
              <div class="trade-tab-header-item main" :class="{'waiting': activeComponent === 'app-payment', 'complete': (activeComponent === 'app-receive' || activeComponent === 'app-confirm' || activeComponent === 'app-rate')}"></div>
            </div>
            <div class="trade-tab-header-item-wrapper" @click="switchToConfirmTab">
              <div class="trade-tab-header-item-text">3. Confirm</div>
              <div class="trade-tab-header-item main" :class="{'waiting': activeComponent === 'app-confirm', 'complete': (activeComponent === 'app-receive' || activeComponent === 'app-rate')}"></div>
            </div>
            <div class="trade-tab-header-item-wrapper" @click="switchToReceiveTab">
              <div class="trade-tab-header-item-text">4. Receive</div>
              <div class="trade-tab-header-item main" :class="{'waiting': activeComponent === 'app-receive', 'complete': activeComponent === 'app-rate'}"></div>
            </div>
            <div class="trade-tab-header-item-wrapper" @click="switchToRateTab">
              <div class="trade-tab-header-item-text">5. Rate</div>
              <div class="trade-tab-header-item end" :class="{'waiting': activeComponent === 'app-rate'}"></div>
            </div>
          </div>
        </div>
        <div v-if="(activeComponent === 'app-confirm' || activeComponent === 'app-receive' || activeComponent === 'app-payment' || activeComponent === 'app-receive' || activeComponent === 'app-rate')" class="trade-info">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-md-flex d-none justify-content-between align-items-center">
              <div class="d-flex">
                <span class="mr-1 small font-weight-bold">ref:</span>
                <label>
                  <input type="text" id="trade-id" readonly value="drfgsdnhgdjkdghmw64rytr453fhd86f">
                </label>
              </div>
              <button @mouseover="$store.commit('showTip', $event)" @mouseleave="$store.commit('hideTip', $event)" @click="copyToClipboard('trade-id')" class="trade-summon-btn"><span class="tip">Copy</span><span class="fa fa-copy"></span></button>
            </div>
            <div class="d-block d-md-none">
              <button @click="displayCopiedMessage('drfgsdnhgdjkdghmw64rytr453fhd86f')" @mouseover="$store.commit('showTip', $event)" @mouseleave="$store.commit('hideTip', $event)" class="copy-trade-id-btn"><span class="copied-tip" :style="{'display': showCopied ? 'block' : 'none'}">Copied</span><span>Copy Trade ID</span></button>
            </div>
            <div class="d-flex">
              <button @mouseover="$store.commit('showTip', $event)" @mouseleave="$store.commit('hideTip', $event)" class="trade-summon-btn"><span class="tip">Summon via SMS</span><span class="fa fa-sms"></span></button>
              <button @mouseover="$store.commit('showTip', $event)" @mouseleave="$store.commit('hideTip', $event)" class="trade-summon-btn"><span class="tip">Summon via mail</span><span class="fa fa-envelope"></span></button>
            </div>
          </div>
        </div>
        <div v-if="(activeComponent === 'app-confirm' || activeComponent === 'app-receive' || activeComponent === 'app-payment' || activeComponent === 'app-receive' || activeComponent === 'app-rate')" class="trade-timer">
          <vue-countdown-timer
              @end_callback="cancelTrade"
              :start-time="startTimer"
              :end-time="endTimer"
              :interval="1000"
              :end-label="'Trade Automatically Cancels in'"
              label-position="begin"
              :end-text="'Trade Cancelled!'"
              :day-txt="null"
              :hour-txt="null"
              :minutes-txt="'minutes'"
              :seconds-txt="'seconds'">
          </vue-countdown-timer>
        </div>
        <div class="trade-tab-body" :class="{' d-flex align-items-center': $store.getters.showTradeWindowLoader}">
          <app-loader/>
          <Animated leave="fadeOut" mode="out-in">
            <component type="buy" @confirm="showConfirmModal" :tradeCancelled="tradeCancelled" :is="activeComponent"></component>
          </Animated>
        </div>
      </div>
    <app-chat-box/>
    <app-trader-details type="buy"/>
    <v-dialog name="modal" :clickToClose="false"/>
  </div>
</template>

<script>
import Amount from "@/components/body/initiate-trade/partials/Amount";
import Payment from "@/components/body/initiate-trade/partials/Payment";
import Receive from "@/components/body/initiate-trade/partials/Receive";
import Confirmation from "@/components/body/initiate-trade/partials/Confirmation";
import TraderDetails from "@/components/body/initiate-trade/partials/TraderDetails";
import Rate from "@/components/body/initiate-trade/partials/Rate";
import ChatBox from "@/components/body/initiate-trade/partials/ChatBox";
import Loader from  "@/components/body/loader/Loader";
export default{
  data(){
    return{
      activeComponent: 'app-amount',
      startTimer: null,
      endTimer: null,
      showCopied: false,
      tradeCancelled: false,
    }
  },
  created() {
    this.startTimer = new Date();
    this.endTimer = this.computeTimerEnd(20);
  },
  methods: {
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
    cancelTrade(){
      this.tradeCancelled = true;
    },
    displayCopiedMessage(field){
      const tempInput = document.createElement("input");
      tempInput.value = field;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      this.showCopied = true;
      setTimeout(() => {
        this.showCopied = false;
      }, 1500);
    },
    copyToClipboard(input){
      let inputFieldTextToCopy = document.getElementById(input);
      inputFieldTextToCopy.select();
      inputFieldTextToCopy.setSelectionRange(0, 99999);
      document.execCommand("copy");
    },
    computeTimerEnd(minutes){
      return new Date((new Date()).getTime() + minutes*60000);
    },
    switchToAmountTab(){
      this.activeComponent = 'app-amount';
    },
    switchToPaymentTab(){
      this.activeComponent = 'app-payment';
    },
    switchToConfirmTab(){
      this.activeComponent = 'app-confirm';
    },
    switchToReceiveTab(){
      this.activeComponent = 'app-receive';
    },
    switchToRateTab(){
      this.activeComponent = 'app-rate';
    }
  },
  components: {
    appAmount: Amount,
    appPayment: Payment,
    appConfirm: Confirmation,
    appReceive: Receive,
    appRate: Rate,
    appTraderDetails: TraderDetails,
    appChatBox: ChatBox,
    appLoader: Loader
  }
}
</script>

<style>
  .trade-details-body,
  .trade-chat-body{
    padding: 10px 15px;
    color: #807e7e;
  }
  .trade-details-header, .trade-chat-header{
    padding: 10px 15px;
    color: #807e7e;
    border-bottom: 1px solid #e7e6e6;
  }
  .page-container{
    margin-top: 100px;
    min-height: 50vh;
    background: #F9FAFB;
    padding: 50px 10px;
  }
  .trade-tabs{
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 25px #cccccc;
    padding: 5px;
  }
  .trade-details, .trade-chat{
    margin-top: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 25px #cccccc;
    padding: 5px;
  }
  .trade-details{
    min-height: 200px;
  }
  .trade-chat{
    min-height: 600px;
  }
  .trade-tab-header{
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #e7e6e6;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    width: 100%;
    overflow-x: auto;
  }
  .trade-tab-header-item{
    cursor: pointer;
  }
  .trade-tab-header-item-text{

  }
  .trade-tab-header-item.main {
    width: 160px;
    height: 45px;
    transform: skew(38deg);
    background: #c4c4c4;
    margin: 0 2px;
  }
  .trade-tab-header-item.main.complete,
  .trade-tab-header-item.start.complete{
    border-bottom: 45px solid #28a745;
  }
  .trade-tab-header-item.end.complete{
    border-top: 45px solid #28a745;
  }
  .trade-tab-header-item.start.waiting,
  .trade-tab-header-item.main.waiting{
    border-bottom: 45px solid #ffc107;
  }
  .trade-tab-header-item.end.waiting{
    border-top: 45px solid #ffc107;
  }

  .trade-tab-header-item.start {
    border-bottom: 45px solid #c4c4c4;
    border-right: 35px solid transparent;
    height: 0;
    width: 160px;
    margin-right: -16px;
    text-align: center;
  }
  .trade-tab-header-item.end {
    border-top: 45px solid #c4c4c4;
    border-left: 35px solid transparent;
    height: 0;
    width: 160px;
    margin-left: -16px;
    text-align: center;
  }
  .trade-tab-header-item-wrapper{
    position: relative;
    z-index: 99;
  }
  .trade-tab-header-item-text{
    position: absolute;
    color: #fff;
    z-index: 999;
    left: 45px;
    top: 12px;
    cursor: pointer;
    font-size: 13px;
  }
  .trade-tab-body{
    background: white;
    padding: 30px 20px;
    border-radius: 10px;
    min-height: 200px;
  }
  .trade-page-title{
    text-align: center;
    font-size: 25px;
    padding: 10px;
    color: #807e7e;
    font-weight: 500;
  }
  .trade-timer{
    text-align: center;
    padding-top: 5px;
    color: #b7b3b3;
  }
  .trade-info{
    padding: 10px;
    color: #807e7e;
  }
  .trade-summon-btn{
    padding: 5px 10px;
    border: none;
    margin: 3px;
    border-radius: 3px;
  }
  .trade-summon-btn:focus{
    outline: none;
  }
  .trade-summon-btn:hover{
    background: #c4c4c4;
  }
  #trade-id{
    width: 260px;
    font-size: 13px;
    border: none;
    color: #807e7e;
  }
  #trade-id:focus{
    border: none;
    outline: none;
  }
  .copy-trade-id-btn{
    padding: 5px 10px;
    font-size: 13px;
    border-radius: 3px;
    border: none;
    font-weight: 500;
  }
  .copy-trade-id-btn:focus{
    outline: none;
  }
  .copy-trade-id-btn:hover{
    background: #c4c4c4;
  }
  .copied-tip{
    position: absolute;
    margin-top: -55px;
    margin-left: -15px;
    background: #444242;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 13px;
    display: none;
    color: white;
    z-index: 9999;
  }
  @media screen and (max-width: 600px) {
    .trade-tab-body{
      min-height: 300px;
    }
    .page-container{
      padding: 50px 20px;
    }
    .trade-tab-header-item-text{
      font-size: 12px;
      left: 30px;
      top: 8px;
    }
    .trade-tab-header-item.main {
      width: 120px;
      height: 35px;
      transform: skew(35deg);
    }
    .trade-tab-header-item.main.complete,
    .trade-tab-header-item.start.complete{
      border-bottom: 35px solid #28a745;
    }
    .trade-tab-header-item.start.waiting,
    .trade-tab-header-item.main.waiting{
      border-bottom: 35px solid #ffc107;
    }
    .trade-tab-header-item.end.complete{
      border-top: 35px solid #28a745;
    }
    .trade-tab-header-item.end.waiting{
      border-top: 35px solid #ffc107;
    }
    .trade-tab-header-item.start {
      border-bottom: 35px solid #c4c4c4;
      border-right: 25px solid transparent;
      width: 120px;
      margin-right: -11px;
    }
    .trade-tab-header-item.end {
      border-top: 35px solid #c4c4c4;
      border-left: 25px solid transparent;
      width: 120px;
      margin-left: -11px;
    }
  }
</style>