<template>
  <div :class="styles" class="alert d-flex align-items-center" role="alert">
    <span v-if="type === 'success'" class="fa fa-check-circle mr-2"></span>
    <span v-if="type === 'error'" class="fa fa-exclamation-triangle mr-2"></span>
    <div class="small">
      {{ message }}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['type', 'message'],
    data(){
      return{

      }
    },
    computed: {
      styles() {
        return {
          'alert-success': this.type === 'success',
          'alert-danger': this.type === 'error',
        }
      }
    }
  }
</script>