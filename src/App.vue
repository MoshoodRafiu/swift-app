<template>
  <div id="app">
    <app-navbar :is-home="['home'].includes($route.name)" v-if="!['login', 'register', 'forgotPassword', 'changePassword', '404'].includes($route.name)"></app-navbar>
    <router-view></router-view>
    <app-footer v-if="!['login', 'register', 'forgotPassword', 'changePassword', '404'].includes($route.name)"></app-footer>
    <div v-if="showScrollToTop" class="scroll-icon" @click="scrollToTop">
      <span class="fa fa-angle-up"></span>
    </div>
    <v-dialog name="modal" :clickToClose="false"/>
  </div>
</template>

<script>

import Navbar from "@/components/header/Navbar";
import Footer from "./components/footer/Footer";

export default {
  name: 'App',
  data(){
    return{
      showScrollToTop: false
    }
  },
  created(){
    window.addEventListener('scroll', () => {
      this.showScrollToTop = window.scrollY > 700;
    });
  },
  methods: {
    scrollToTop(){
      const element = document.getElementById("app");
      element.scrollIntoView({behavior: 'smooth'});
    }
  },
  components: {
    appFooter: Footer,
    appNavbar: Navbar
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  *{
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  body{
    box-sizing: border-box;
    width: 100%;
    overflow-x: hidden;
  }
  .vue-dialog-button:focus{
    outline: none;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 100ms
  }
  .fade-enter, .fade-leave-to{
    opacity: 0.8
  }
  .scroll-icon{
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 5px 12px;
    background: linear-gradient(135deg, #1641b5, #63fff3);
    margin: 10px;
    border-radius: 3px;
    color: #ffffff;
    cursor: pointer;
  }
  .scroll-icon span{
    font-size: 30px;
  }
  @media screen and (max-width: 600px) {
    .vm--modal{
      margin: 50px auto;
      width: 300px !important;
    }
  }
  @media screen and (max-width: 310px) {
    .vm--modal{
      margin: 50px auto;
      width: 280px !important;
    }
  }
</style>