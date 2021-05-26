<template>
  <div class="text-danger small">
    <strong>{{ message }}</strong>
  </div>
</template>

<script>
  export default {
    props: ['message']
  }
</script>