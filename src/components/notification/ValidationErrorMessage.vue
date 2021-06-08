<template>
  <div class="text-danger small">
    <strong class="small font-weight-bolder">{{ message }}</strong>
  </div>
</template>

<script>
  export default {
    props: ['message']
  }
</script>