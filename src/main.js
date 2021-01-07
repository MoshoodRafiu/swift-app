import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import { routes } from "./routes";
import { store } from "@/store/store";
import SlideUpDown from 'vue-slide-up-down';
import {Tabs, Tab} from 'vue-tabs-component';
import VueAnimated from '@codekraft-studio/vue-animated';
import VueCountdownTimer from 'vuejs-countdown-timer';
import VModal from 'vue-js-modal';

Vue.use(VueAnimated, {
  defaultDuration: 500,
  functional: true
});
Vue.use(VModal, { dialog: true });
Vue.use(VueCountdownTimer);
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
Vue.use(VueRouter);
Vue.component('slide-up-down', SlideUpDown);
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else {
      return { x: 0, y: 0 }
    }
  }
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
