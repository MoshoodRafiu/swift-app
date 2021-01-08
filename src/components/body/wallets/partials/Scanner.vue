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
                  <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
                    <div v-if="validationSuccess" class="validation-success">
                      Address Validation Success
                    </div>

                    <div v-if="validationFailure" class="validation-failure">
                      Invalid Address
                    </div>

                    <div v-if="validationPending" class="validation-pending">
                      Validating Address...
                    </div>
                  </qrcode-stream>
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
  data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
    }
  },
  computed: {
    validationPending () {
      return this.isValid === undefined
          && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    }
  },
  methods: {

    onInit (promise) {
      promise
          .catch(console.error)
          .then(this.resetValidationState)
    },
    resetValidationState () {
      this.isValid = undefined
    },

    async onDecode (content) {
      this.result = content
      this.turnCameraOff()

      // pretend it's taking really long
      await this.timeout(1000)
      this.isValid = true;

      // some more delay, so users have time to read the message
      await this.timeout(1000)
      this.$emit('scanComplete', {address: this.result})
      // this.turnCameraOn()
    },

    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }
  },
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
 .validation-success,
 .validation-failure,
 .validation-pending {
   position: absolute;
   width: 100%;
   height: 100%;

   background-color: rgba(255, 255, 255, .8);
   text-align: center;
   font-weight: bold;
   font-size: 0.6rem;
   padding: 10px;

   display: flex;
   flex-flow: column nowrap;
   justify-content: center;
 }
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
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
