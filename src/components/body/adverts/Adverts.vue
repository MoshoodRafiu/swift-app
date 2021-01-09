<template>
  <div class="page-container">
    <div class="col-md-8 mx-auto ads-container">
      <div class="trades-header">
        <div class="trades-header-tab-header">
          <div class="trades-header-tab-item" :class="{'active': activeComponent === 'app-my-adverts'}" @click="switchComponent('app-my-adverts')">
            My Adverts
          </div>
          <div class="trades-header-tab-item" :class="{'active': activeComponent === 'app-new-advert'}" @click="switchComponent('app-new-advert')">
            New Advert
          </div>
        </div>
      </div>
      <div :class="{' d-flex align-items-center': false}">
        <app-loader/>
        <div class="ads-body">
          <app-loader/>
          <Animated leave="fadeOut" mode="out-in">
            <component type="buy" :is="activeComponent" @confirm="showConfirmModal"></component>
          </Animated>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAdverts from "@/components/body/adverts/MyAdverts";
import NewAdvert from "@/components/body/adverts/NewAdvert";
import Loader from "@/components/body/loader/Loader";
export default {
  data(){
    return{
      activeComponent: 'app-my-adverts'
    }
  },
  created() {
    this.$store.commit('hideNavigations');
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
    switchComponent(to){
      this.activeComponent = to;
    }
  },
  components: {
    appMyAdverts: MyAdverts,
    appNewAdvert: NewAdvert,
    appLoader: Loader
  }
}
</script>

<style>
.ads-container{
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 25px #cccccc;
  padding: 20px 15px;
}
.ads-body{
  padding: 10px;
  min-height: 250px;
}
</style>