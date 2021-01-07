<template>
  <div class="row">
    <div class="col-md-6 doc-verification-wrapper">
      <div class="doc-verification-container mb-5">
        <img @click="selectFile('photo')" class="doc-verification" src="../../../assets/verification/face.svg" alt="photo">
        <div @click="selectFile('photo')" v-if="!photoUploaded && !photoUploading">
          <div class="verification-info">Click to upload photo</div>
          <div class="doc-info">(Photo should be clear and bright enough for easy verification)</div>
        </div>
        <div>
          <div v-if="!photoUploaded && photoUploading">
            <div class="ver-upload-progress-container">
              <div class="ver-upload-progress" :style="{'width': photoUploadPercent+'%'}"></div>
            </div>
            <div class="ver-upload-progress-percentage">
              {{ photoUploadPercent }}%
            </div>
          </div>
        </div>
        <div v-if="photoUploaded && !photoUploading">
          <div>
            <div class="verification-info text-success">Uploaded Successfully</div>
            <div class="doc-info">(Verification usually take up to 12 hours or more)</div>
          </div>
          <div>
            <button @click="showImage = true" class="ver-action-button">View</button>
            <button @click="selectFile('photo', true)" class="ver-action-button">Reupload</button>
          </div>
        </div>
        <input type="file" @input="uploadFile('photo')" ref="ver_photo" hidden>
      </div>
    </div>
    <div class="col-md-6 doc-verification-wrapper">
      <div class="doc-verification-container mb-5">
        <img @click="selectFile('doc')" class="doc-verification" src="../../../assets/verification/file.svg" alt="doc">
        <div @click="selectFile('doc')" v-if="!docUploaded && !docUploading">
          <div class="verification-info">Click to upload documents</div>
          <div class="doc-info">(National ID, International Passport or Voter's Card)</div>
        </div>
        <div>
          <div v-if="!docUploaded && docUploading">
            <div class="ver-upload-progress-container">
              <div class="ver-upload-progress" :style="{'width': docUploadPercent+'%'}"></div>
            </div>
            <div class="ver-upload-progress-percentage">
              {{ docUploadPercent }}%
            </div>
          </div>
        </div>
        <div>
          <div v-if="docUploaded && !docUploading">
            <div>
              <div class="verification-info text-success">Uploaded Successfully</div>
              <div class="doc-info">(Verification usually take up to 12 hours or more)</div>
            </div>
            <div>
              <button @click="showImage = true" class="ver-action-button">View</button>
              <button @click="selectFile('doc', true)" class="ver-action-button">Reupload</button>
            </div>
          </div>
        </div>
        <input type="file" @input="uploadFile('doc')" ref="ver_doc" hidden>
      </div>
    </div>
    <app-view-doc v-if="showImage" @close="showImage = false"/>
  </div>
</template>

<script>
  import ViewDoc from "@/components/body/verification/partials/ViewDoc";
  export default {
    data(){
      return{
        showImage: false,
        photoUploaded: false,
        docUploaded: false,
        photoUploading: false,
        docUploading: false,
        photoUploadPercent: 0,
        docUploadPercent: 0,
      }
    },
    methods: {
      selectFile(type, reUploading = false){
        if ((!this.photoUploaded && !this.photoUploading) || (!this.docUploaded && !this.docUploading) || reUploading){
          if (type === 'photo'){
            let fileInputElement = this.$refs.ver_photo;
            fileInputElement.click();
          }else if (type === 'doc'){
            let fileInputElement = this.$refs.ver_doc;
            fileInputElement.click();
          }
        }
      },
      showUploadStatus(type){
        if (type === 'photo'){
          this.photoUploaded = false;
          this.photoUploadPercent = 0;
          this.photoUploading = true;
        }else if (type === 'doc'){
          this.docUploaded = false;
          this.docUploadPercent = 0;
          this.docUploading = true;
        }
        let uploadInterval = setInterval(() => {
          if (type === 'photo' && this.photoUploadPercent >= 100){
            clearInterval(uploadInterval);
            this.photoUploading = false;
            this.photoUploaded = true;
          }else if (type === 'doc' && this.docUploadPercent >= 100){
            clearInterval(uploadInterval);
            this.docUploading = false;
            this.docUploaded = true;
          }
          if (type === 'photo'){
            this.photoUploadPercent += 5;
          }else if (type === 'doc'){
            this.docUploadPercent += 5;
          }
        }, 50);

      },
      uploadFile(type){
        this.showUploadStatus(type);
      },
    },
    components: {
      appViewDoc: ViewDoc,
    }
  }
</script>

<style>
  .ver-upload-progress,
  .ver-upload-progress-container{
    height: 10px;
    border-radius: 5px;
  }
  .ver-upload-progress-container{
    margin: 20px auto 3px auto;
    background: #cccccc;
    width: 80%;
  }
  .ver-upload-progress{
    background: #22cf22;
    width: 10%;
  }
  .ver-upload-progress-percentage{
    font-size: 12px;
    color: #807e7e;
  }
  .doc-verification-wrapper{
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
  }
  .doc-verification{
    width: 50%;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  .doc-verification-container{
    text-align: center;
  }
  .verification-info{
    color: #807e7e;
    font-size: 16px;
    margin: 5px;
    cursor: pointer;
  }
  .doc-info{
    color: #807e7e;
    font-size: 13px;
    margin: 5px;
    cursor: pointer;
  }
  .ver-action-button{
    font-size: 13px;
    padding: 5px 10px;
    margin: 10px 5px;
    border: none;
    border-radius: 3px;
  }
  .ver-action-button:hover{
    background: #cccccc;
  }
  .ver-action-button:focus{
    outline: none;
  }
  @media screen and (max-width: 500px) {
    .doc-verification{
      width: 75%;
    }
    .doc-info{
      font-size: 11px;
      margin: 5px;
    }
  }
  @media screen and (max-width: 350px) {
    .doc-verification{
      width: 80%;
    }
  }
</style>