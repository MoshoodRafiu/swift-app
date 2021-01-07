<template>
  <div class="page-container">
    <h5 class="trade-page-title">Sell <span class="text-lowercase">{{ $store.getters.getActiveCurrency.name }}</span> to devKunle</h5>
    <div class="col-md-8 mx-auto trade-tabs">
      <div class="trade-tab-header-wrapper">
        <div class="trade-tab-header">
          <div class="trade-tab-header-item-wrapper" @click="switchToAmountTab">
            <div class="trade-tab-header-item-text start">1. Amount</div>
            <div class="trade-tab-header-item start complete" :class="{'waiting': activeComponent === 'app-amount'}"></div>
          </div>
          <div class="trade-tab-header-item-wrapper" @click="switchToWaitingTab">
            <div class="trade-tab-header-item-text">2. Waiting</div>
            <div class="trade-tab-header-item main" :class="{'waiting': activeComponent === 'app-waiting', 'complete': (activeComponent === 'app-release' || activeComponent === 'app-confirm' || activeComponent === 'app-rate')}"></div>
          </div>
          <div class="trade-tab-header-item-wrapper" @click="switchToConfirmTab">
            <div class="trade-tab-header-item-text">3. Confirm</div>
            <div class="trade-tab-header-item main" :class="{'waiting': activeComponent === 'app-confirm', 'complete': (activeComponent === 'app-release' || activeComponent === 'app-rate')}"></div>
          </div>
          <div class="trade-tab-header-item-wrapper" @click="switchToReleaseTab">
            <div class="trade-tab-header-item-text">4. Release</div>
            <div class="trade-tab-header-item main" :class="{'waiting': activeComponent === 'app-release', 'complete': activeComponent === 'app-rate'}"></div>
          </div>
          <div class="trade-tab-header-item-wrapper" @click="switchToRateTab">
            <div class="trade-tab-header-item-text">5. Rate</div>
            <div class="trade-tab-header-item end" :class="{'waiting': activeComponent === 'app-rate'}"></div>
          </div>
        </div>
      </div>
      <div v-if="(activeComponent === 'app-confirm' || activeComponent === 'app-release' || activeComponent === 'app-waiting' || activeComponent === 'app-rate')" class="trade-info">
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
      <div v-if="(activeComponent === 'app-confirm' || activeComponent === 'app-release' || activeComponent === 'app-waiting' || activeComponent === 'app-rate')" class="trade-timer">
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
          <component @confirm="showConfirmModal" type="sell" :tradeCancelled="tradeCancelled" :is="activeComponent"></component>
        </Animated>
      </div>
    </div>
    <app-chat-box/>
    <app-trader-details type="sell"/>
    <v-dialog name="modal" :clickToClose="false"/>
  </div>
</template>

<script>
import Amount from "@/components/body/initiate-trade/partials/Amount";
import Waiting from "@/components/body/initiate-trade/partials/Waiting";
import Release from "@/components/body/initiate-trade/partials/Release";
import Confirmation from "@/components/body/initiate-trade/partials/Confirmation";
import TraderDetails from "@/components/body/initiate-trade/partials/TraderDetails";
import Rate from "@/components/body/initiate-trade/partials/Rate";
import ChatBox from "@/components/body/initiate-trade/partials/ChatBox";
import Loader from "@/components/body/loader/Loader";
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
    copyToClipboard: (input) => {
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
    switchToWaitingTab(){
      this.activeComponent = 'app-waiting';
    },
    switchToReleaseTab(){
      this.activeComponent = 'app-release';
    },
    switchToConfirmTab(){
      this.activeComponent = 'app-confirm';
    },
    switchToRateTab(){
      this.activeComponent = 'app-rate';
    }
  },
  components: {
    appAmount: Amount,
    appWaiting: Waiting,
    appConfirm: Confirmation,
    appRelease: Release,
    appRate: Rate,
    appTraderDetails: TraderDetails,
    appChatBox: ChatBox,
    appLoader: Loader
  }
}
</script>

<style>

</style>