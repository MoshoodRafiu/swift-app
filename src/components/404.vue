<template>
  <div class="page-body">
    <div class="text-center">
      <img src="../assets/not-found.svg" class="not-found-image" alt="404">
      <div class="text-center not-found-text mt-3">
        Looks like you entered an invalid url
      </div>
      <div>
        <button class="not-found-button" @click="$router.push('/')">Back to home</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .page-body{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #041c5b;
  }
  .not-found-text{
    color: white;
  }
  .not-found-button{
    margin: 15px;
    padding: 12px 25px;
    border-radius: 3px;
    color: #041c5b;
    font-weight: 500;
    background: #ffffff;
    border: none;
  }
  .not-found-button:hover{
    background: #d6cfcf;
  }
  .not-found-image{
    width: 380px;
  }
  @media screen and (max-width: 600px) {
    .not-found-image{
      width: 320px;
    }
  }
  @media screen and (max-width: 450px) {
    .not-found-image{
      width: 280px;
    }
  }
  @media screen and (max-width: 400px) {
    .not-found-image{
      width: 250px;
    }
  }
  @media screen and (max-width: 350px) {
    .not-found-image{
      width: 230px;
    }
  }
</style>