<template>
  <div class="app-loader">
    <div v-if="false" class="spinner-grow" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>

</script>

<style>
  .app-loader{
    width: 100% !important;
    height: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .spinner-grow{
    width: 3rem;
    height: 3rem;
    background: #c4c4c4;
  }
</style>