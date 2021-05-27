<template>
  <div class="page-container">
    <div class="col-md-8 mx-auto verification-container">
      <div class="trades-header">
        <div class="trades-header-tab-header">
          <div class="trades-header-tab-item" :class="{'active': activeComponent === 'app-email'}" @click="switchComponent('app-email')">
            Email
          </div>
          <div class="trades-header-tab-item" :class="{'active': activeComponent === 'app-phone'}" @click="switchComponent('app-phone')">
            Phone
          </div>
          <div class="trades-header-tab-item" :class="{'active': activeComponent === 'app-documents'}" @click="switchComponent('app-documents')">
            Documents
          </div>
        </div>
      </div>
      <div :class="{' d-flex align-items-center': false}">
        <div class="verification-body">
          <Animated leave="fadeOut" mode="out-in">
            <component :is="activeComponent"></component>
          </Animated>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Email from "@/components/body/verification/Email";
  import Phone from "@/components/body/verification/Phone";
  import Documents from "@/components/body/verification/Documents";
  import Loader from "@/components/body/loader/Loader";
  import Auth from "@/apis/Auth";
  export default {
    data(){
      return{
        activeComponent: 'app-email',
      }
    },
    mounted() {
      if (this.$store.state.isAuthenticated){
        Auth.user()
          .then(res => {
            this.$store.commit('updateUserDetails', res.data.data);
          });
      }
    },
    created() {
      this.$store.commit('hideNavigations');
    },
    methods: {
      switchComponent(to){
        this.activeComponent = to;
      }
    },
    components: {
      appEmail: Email,
      appPhone: Phone,
      appDocuments: Documents,
      appLoader: Loader
    }
  }
</script>

<style>
.verification-container{
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 25px #cccccc;
  padding: 20px 15px;
}
.verification-body{
  min-height: 250px;
}
</style>