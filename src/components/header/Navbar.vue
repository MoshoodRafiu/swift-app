<template>
    <div class="navbar" :class="{'sticky': $store.getters.getSticky || $store.getters.getNavbarStatus || !isHome}">
        <div class="wallet-balance">
          <div>
            Active:
            <span class="text-emphasis">{{ $store.getters.getActiveCurrency.name }}</span>
          </div>
          <div>
            <span class="mr-2">Market cap: <span class="text-emphasis">2,543,546,764.64</span></span>
            <span class="mx-2">Balance: <span class="text-emphasis">0.00000000 {{ $store.getters.getActiveCurrency.abbr }}</span></span>
          </div>
        </div>
        <div class="nav">
          <div class="brand-name">
            <img src="../../assets/logo.png" alt="logo">
            Swift<span class="text-emphasis">hrive</span>
          </div>
          <div class="nav-links">
            <ul :class="{'toggled': $store.getters.getNavbarStatus}">
              <li>
                <router-link tag="a" :to="{name: 'home'}" exact active-class="active">Home</router-link>
              </li>
              <li v-if="$store.state.isAuthenticated">
                <a href="#" :class="{'active': ['profile', 'trades', 'verifications'].includes($route.name)}" @click.prevent="toggleUserDropdown">{{ $store.state.authUser ? $store.state.authUser.username : 'Loading...' }} <span class="fa fa-angle-down"></span></a>
                <div class="sub-menu" :class="{'show': $store.getters.getShowUserDropdown}">
                  <ul>
                    <li>
                      <router-link tag="a" active-class="active" :to="{name: 'profile'}" exact>Profile</router-link>
                    </li>
                    <li>
                      <router-link tag="a" active-class="active" :to="{name: 'trades'}" exact>Trades</router-link>
                    </li>
                    <li>
                      <router-link tag="a" active-class="active" :to="{name: 'verifications'}" exact>Verifications</router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li v-if="!$store.state.isAuthenticated">
                <router-link tag="a" :to="{name: 'login'}" exact>Login</router-link>
              </li>
              <li v-if="$store.state.isAuthenticated">
                <router-link tag="a" active-class="active" :to="{name: 'wallets'}">Wallets</router-link>
              </li>
              <li v-if="$store.state.isAuthenticated">
                <router-link tag="a" active-class="active" :to="{name: 'adverts'}" exact>Adverts</router-link>
              </li>
              <li v-if="!$store.state.isAuthenticated">
                <router-link tag="a" :to="{name: 'register'}" exact>Register</router-link>
              </li>
              <li v-if="$store.state.isAuthenticated">
                <a href="#" @click.prevent="logout">Logout <span v-if="$store.state.showActionLoader" class="spinner-border spinner-border-sm" role="status"></span></a>
              </li>
            </ul>
            <div>
              <span @click="$store.commit('toggleNavbar')" class="fa fa-align-justify toggle-drop-down"></span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
    import Auth from "@/apis/Auth";
    export default{
      props: ['isHome'],
      data(){
        return{
        }
      },
      methods: {
        toggleUserDropdown(){
          if (window.innerWidth <= 900){
            this.$store.commit('toggleShowUserDropdown');
          }
        },
        logout(){
          this.$store.state.showActionLoader = true;
          Auth.logout()
            .then(() => {
              this.deleteCredentialsAndRedirect();
            })
            .catch(() => {
              this.deleteCredentialsAndRedirect();
            });
        },
        deleteCredentialsAndRedirect(){
          this.$store.commit('logUserOut');
          if (this.$route.name !== 'home'){
            this.$router.push({ name: 'home' });
          }
          this.$store.state.showActionLoader = false;
        }
      }
    }
</script>

<style scoped>
  header{
    min-height: 100vh;
    background: linear-gradient(rgba(29, 28, 152, 0.96), rgba(29, 28, 152, 0.9)), url("../../assets/header.svg") center/cover;
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
    z-index: 99999999;
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
    z-index: 99999999;
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
  .sub-menu::before{
    position: absolute;
    content: " ";
    right: 50%;
    top: -7px;
    border-bottom: 7px solid #2bffae;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
  }
  .nav-links ul li:hover .sub-menu{
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s linear, visibility 0.3s linear;
  }
  .sub-menu{
    visibility: hidden;
    opacity: 1;
    position: absolute;
    left: 0;
    margin-top: 10px;
    background: #1D1C98;
    padding: 10px;
    z-index: 99999;
    border-radius: 5px;
    border: 1px solid #2bffae;
    transition: opacity 0.3s linear, visibility 0.3s linear;
  }
  .sub-menu ul li{
    display: block !important;
    padding: 5px 10px !important;
  }
  .nav-links ul li{
    display: inline;
    padding: 10px 20px;
    position: relative;
  }
  .nav-links ul li a{
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    font-size: 13px;
    letter-spacing: 1px;
  }
  .nav-links ul li a:hover, .nav-links ul li a.active{
    color: #2bffae;
  }
  .header-section-main{
    padding: 30px 20px;
    min-height: 100vh;
    overflow: hidden;
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
    z-index: 9999;
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
    .sub-menu::before{
      right: 90%;
    }
    .sub-menu ul li{
      font-size: 12px;
    }
    .nav-links ul li .sub-menu.show{
      display: block;
    }
    .sub-menu{
      display: none;
      position: relative;
    }
    .sub-menu ul{
      visibility: visible !important;
      opacity: 1;
      position: relative !important;
      top: 0 !important;
    }
    .nav-links ul.toggled{
      opacity: 1;
      visibility: visible;
    }
    .nav-links ul li{
      display: block;
      padding: 20px 70px;
      position: relative;
      font-weight: 400;
    }
    .toggle-drop-down{
      display: block !important;
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
      padding: 13px 30px;
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