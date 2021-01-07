<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div @click="$emit('close')" class="modal-close">x</div>
          <div class="modal-body">
            <div class="text-center">
              <slot name="message">
                <div class="my-2">
                  <img src="../../../../assets/not-found.svg" width="100%" alt="">
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['success'],
  mounted() {
    let self = this;
    window.addEventListener('keyup', function(event) {
      if (event.key === "Escape") {
        self.$emit('close')
      }
    });
  },
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-close{
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 25px;
  padding: 5px 15px;
  color: #B1AFAF;
  cursor: pointer;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 500px;
  margin: 0 auto;
  padding: 40px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.gif{
  width: 100px;
}
.btn-close{
  margin-top: 10px;
  color: #F8F7F9;
  background: #3A5683;
  padding: 10px 20px;
}
.btn-close:hover{
  color: #F8F7F9;
  background: #28406b;
}
.modal-body{
  margin: 0;
  color: #727171;
}
@media screen and (max-width: 600px) {
  .modal-container {
    padding: 30px 30px !important;
    width: 400px;
  }
}

@media screen and (max-width: 450px) {
  .modal-container {
    width: 300px;
  }
}
@media screen and (max-width: 330px) {
  .modal-container {
    width: 270px;
  }
}
</style>
