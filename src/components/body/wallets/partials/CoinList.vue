<template>
  <div>
    <div class="wallet-coin-container">
      <div class="wallet-coin">
        <div class="wallet-coin-name">Bitcoin</div>
        <div><img class="wallet-coin-logo" src="../../../../assets/coins/bitcoin.png" alt="btc"></div>
      </div>
      <div class="wallet-coin-balance">Bal: 0.0000000000</div>
      <div class="wallet-action-btn-container">
        <button @click="$router.push({name: 'deposit', params: {coin: 'btc'}})" class="wallet-action-btn deposit">Deposit</button>
        <button @click="$router.push({name: 'withdraw', params: {coin: 'btc'}})" class="wallet-action-btn withdraw">Withdraw</button>
      </div>
    </div>
    <div class="wallet-coin-container">
      <div class="wallet-coin">
        <div class="wallet-coin-name">Ethereum</div>
        <div><img class="wallet-coin-logo" src="../../../../assets/coins/ethereum.png" alt="eth"></div>
      </div>
      <div class="wallet-coin-balance">Bal: 0.0000000000</div>
      <div class="wallet-action-btn-container">
        <button @click="$router.push({name: 'deposit', params: {coin: 'eth'}})" class="wallet-action-btn deposit">Deposit</button>
        <button @click="$router.push({name: 'withdraw', params: {coin: 'eth'}})" class="wallet-action-btn withdraw">Withdraw</button>
      </div>
    </div>
    <div class="wallet-coin-container">
      <div class="wallet-coin">
        <div class="wallet-coin-name">Litecoin</div>
        <div><img class="wallet-coin-logo" src="../../../../assets/coins/litecoin.png" alt="ltc"></div>
      </div>
      <div class="wallet-coin-balance">Bal: 0.0000000000</div>
      <div class="wallet-action-btn-container">
        <button @click="$router.push({name: 'deposit', params: {coin: 'ltc'}})" class="wallet-action-btn deposit">Deposit</button>
        <button @click="$router.push({name: 'withdraw', params: {coin: 'ltc'}})" class="wallet-action-btn withdraw">Withdraw</button>
      </div>
    </div>
    <div class="wallet-coin-container">
      <div class="wallet-coin">
        <div class="wallet-coin-name">Bitcoin Cash</div>
        <div><img class="wallet-coin-logo" src="../../../../assets/coins/bitcoin-cash.jpg" alt="bch"></div>
      </div>
      <div class="wallet-coin-balance">Bal: 0.0000000000</div>
      <div class="wallet-action-btn-container">
        <button @click="$router.push({name: 'deposit', params: {coin: 'bch'}})" class="wallet-action-btn deposit">Deposit</button>
        <button @click="$router.push({name: 'withdraw', params: {coin: 'bch'}})" class="wallet-action-btn withdraw">Withdraw</button>
      </div>
    </div>
    <div class="wallet-coin-container">
      <div class="wallet-coin">
        <div class="wallet-coin-name">Ripple</div>
        <div><img class="wallet-coin-logo" src="../../../../assets/coins/ripple.png" alt="xrp"></div>
      </div>
      <div class="wallet-coin-balance">Bal: 0.0000000000</div>
      <div class="wallet-action-btn-container">
        <button @click="$router.push({name: 'deposit', params: {coin: 'xrp'}})" class="wallet-action-btn deposit">Deposit</button>
        <button @click="$router.push({name: 'withdraw', params: {coin: 'xrp'}})" class="wallet-action-btn withdraw">Withdraw</button>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>

</style>