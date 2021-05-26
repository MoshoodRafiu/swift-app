<template>
  <div class="col-md-8 mx-auto trade-chat">
    <div class="trade-chat-header">
      <h6>Chat Box</h6>
    </div>
    <div class="trade-chat-body row py-0">
      <div id="chat-body" class="chat-body">
        <div class="row">
          <div class="mx-auto col-10">
            <div class="chat-notification">
              New conversation started
            </div>
          </div>
          <div class="col-12 chat-opp">
            <div class="chat-message">
              <div class="sender-name">seller</div>
              <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut earum facilis fugiat,</div>
              <div class="message-time">07:00</div>
            </div>
          </div>
          <div class="col-12 chat-agent">
            <div class="chat-message">
              <div class="sender-name">Support</div>
              <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
              <div class="message-time">07:00</div>
            </div>
          </div>
          <div class="col-12 chat-user">
            <div class="chat-message">
              <div class="sender-name">devKunle</div>
              <div>Lorem ipsum dolor sit amet.</div>
              <div class="message-time">07:00</div>
            </div>
          </div>
          <div class="col-12 chat-user">
            <div class="chat-message">
              <div class="sender-name">devKunle</div>
              <div>Lorem ipsum dolor.</div>
              <div class="message-time">07:00</div>
            </div>
          </div>
          <div class="col-12 chat-opp">
            <div class="chat-message">
              <div class="sender-name">seller</div>
              <div>Lorem ipsum dolor sit amet, consectetur adipisicing.</div>
              <div class="message-time">07:00 AM</div>
            </div>
          </div>
          <div v-for="(message, index) in messages" :key="index" class="col-12 chat-user">
            <div class="chat-message">
              <div class="sender-name">{{ message.sender === 'user' ? 'devKunle' : 'Seller' }}</div>
              <div>{{ message.message }}</div>
              <div class="message-time">{{ message.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="trade-message-sender">
        <span @click="sendMessage('Hello devKunle')" class="message-to-send">Hello devKunle</span>
        <span @click="sendMessage('Okay, thanks')" class="message-to-send">Okay, thanks</span>
        <span @click="sendMessage('Make Payment')" class="message-to-send">Make Payment</span>
        <span @click="sendMessage('Complete Payment')" class="message-to-send">Complete Payment</span>
        <span @click="sendMessage('Payment not complete')" class="message-to-send">Payment not complete</span>
        <span @click="sendMessage('Send account statement')" class="message-to-send">Send account statement</span>
        <span @click="sendMessage('Send debit screenshot')" class="message-to-send">Send debit screenshot</span>
    </div>
    <div class="upload-file-button-wrapper">
      <input type="file" @input="uploadFile" ref="file" hidden>
      <button @click="selectFile" class="upload-file-button">Upload Image</button>
    </div>
    <div class="p-1">
      <div class="upload-progress">
        <div class="upload-progress-bar"></div>
      </div>
      <div class="upload-progress-text">Uploading 80%</div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        messages: []
      }
    },
    methods: {
      selectFile(){
        let fileInputElement = this.$refs.file;
        fileInputElement.click();
      },
      uploadFile(){
        alert('File Uploading');
      },
      sendMessage(message){
        this.messages.push({ sender: 'user', message: message, time: (new Date()).getHours()+':'+(new Date()).getMinutes() })
        setTimeout(() => {
          this.scrollToBottomOfChat();
        }, 100)
      },
      scrollToBottomOfChat(){
        let div = document.getElementById('chat-body');
        div.scrollTop = div.scrollHeight - div.clientHeight;
      }
    }
  }
</script>

<style>
  .chat-body{
    margin-top: 3px;
    border-radius: 5px;
    background: #eeebeb;
    width: 100%;
    height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .chat-notification{
    margin: 10px;
    text-align: center;
    padding: 0;
    background: #32b6c6;
    font-size: 10px;
    color: #ffffff;
    border-radius: 20px;
  }
  .chat-message{
    margin: 5px;
    background: red;
    color: white;
    padding: 12px 15px;
    width: 500px;
    font-size: 12px;
    float: left;
  }
  .sender-name{
    font-size: 8px;
    font-style: italic;
  }
  .chat-agent,
  .chat-opp,
  .chat-user{
    display: flex;
    align-items: center;
  }
  .chat-user{
    justify-content: flex-end;
  }
  .chat-user .chat-message{
    background: #807e7e;
  }
  .chat-user .chat-message{
    border-radius: 25px 25px 0 25px;
  }
  .chat-opp .chat-message,
  .chat-agent .chat-message{
    border-radius: 25px 25px 25px 0;
  }
  .chat-opp{
    justify-content: flex-start;
  }
  .chat-opp .chat-message{
    background: #638af5;
  }
  .chat-agent{
    justify-content: flex-start;
  }
  .chat-agent .chat-message{
    background: #010c29;
  }
  .message-time{
    text-align: right;
    font-size: 8px;
  }
  .message-to-send{
    border-radius: 10px;
    padding: 10px;
    background: linear-gradient(155deg, #1641b5, #2ef3e4);
    -webkit-text-fill-color: #ffffff;
    color: white;
    font-size: 14px;
    margin-right: 10px;
    cursor: pointer;
  }
  .message-to-send:hover{
    background: linear-gradient(155deg, #2ef3e4, #1641b5);
    -webkit-text-fill-color: #ffffff;
    color: white;
  }
  .trade-message-sender{
    margin: 3px 0;
    padding: 20px 10px;
    border-radius: 5px;
    background: #fff;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }
  .trade-message-list li{
    display: inline-block;
  }
  .upload-file-button-wrapper{
    padding: 5px;
    text-align: center;
    margin-bottom: 10px;
  }
  .upload-file-button{
    border: none;
    padding: 15px 25px;
    width: 100%;
    border-radius: 5px;
  }
  .upload-progress, .upload-progress-bar{
    height: 5px;
    border-radius: 5px;
  }
  .upload-progress{
    width: 100%;
    background: #cccccc;
  }
  .upload-progress-bar{
    background: #22cf22;
    width: 80%;
  }
  .upload-progress-text{
    text-align: center;
    padding: 5px;
    font-size: 10px;
    color: #807e7e;
  }
  .upload-file-button:focus{
    outline: none;
  }
  .upload-file-button:hover{
    background: #c4c4c4;
  }
  @media screen and (max-width: 800px) {
    .chat-message{
      width: 400px;
      font-size: 10px;
    }
  }
  @media screen and (max-width: 500px) {
    .chat-message{
      width: 260px;
    }
  }
</style>