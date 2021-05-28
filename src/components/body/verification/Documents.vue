<template>
  <div class="row">
    <div class="col-12 px-4 py-3">
      <app-alert v-if="alert.present" :type="alert.type" :message="alert.message"/>
    </div>
    <div class="col-md-6 doc-verification-wrapper">
      <div class="doc-verification-container mb-5">
        <img v-if="!$store.state.authUser.files.photo.url" @click="selectPhoto" class="doc-verification" src="../../../assets/verification/face.svg" alt="photo">
        <img v-else @click="selectPhoto" class="doc-verification" :src="$store.state.authUser.files.photo.url" alt="photo">
        <div v-if="!$store.state.authUser.files.photo.url" @click="selectPhoto">
          <div class="verification-info">Click to upload photo</div>
          <div class="doc-info">(Photo should be clear and bright enough for easy verification)</div>
        </div>
        <div>
          <div v-if="uploading.photo">
            <div class="ver-upload-progress-container">
              <div class="ver-upload-progress" :style="{'width': $store.state.uploadProgress.photo+'%'}"></div>
            </div>
            <div class="ver-upload-progress-percentage">
              {{ $store.state.uploadProgress.photo }} %
            </div>
          </div>
        </div>
        <div v-if="$store.state.authUser.files.photo.url">
          <div>
            <div :class="getPhotoVerificationStatus.class" class="verification-info text-success">{{ getPhotoVerificationStatus.message }}</div>
            <div v-if="photoVerificationIsPending" class="doc-info">(Verification usually take up to 12 hours or more)</div>
          </div>
          <div>
            <button @click="showImageOnPopUp('photo')" class="ver-action-button">View</button>
            <button v-if="photoVerificationIsPending" @click="selectPhoto" class="ver-action-button">Reupload</button>
          </div>
        </div>
        <input type="file" @change="handlePhotoUpload" ref="photo" hidden>
      </div>
    </div>
    <div class="col-md-6 doc-verification-wrapper">
      <div class="doc-verification-container mb-5">
        <img v-if="!$store.state.authUser.files.document.url" @click="selectDocument" class="doc-verification" src="../../../assets/verification/file.svg" alt="document">
        <img v-else @click="selectDocument" class="doc-verification" :src="$store.state.authUser.files.document.url" alt="document">
        <div v-if="!$store.state.authUser.files.document.url" @click="selectDocument">
          <div class="verification-info">Click to upload documents</div>
          <div class="doc-info">(National ID, International Passport or Voter's Card)</div>
        </div>
        <div>
          <div v-if="uploading.document">
            <div class="ver-upload-progress-container">
              <div class="ver-upload-progress" :style="{'width': $store.state.uploadProgress.document+'%'}"></div>
            </div>
            <div class="ver-upload-progress-percentage">
              {{ $store.state.uploadProgress.document }} %
            </div>
          </div>
        </div>
        <div v-if="$store.state.authUser.files.document.url">
          <div>
            <div :class="getDocumentVerificationStatus.class" class="verification-info text-success">{{ getDocumentVerificationStatus.message }}</div>
            <div v-if="documentVerificationIsPending" class="doc-info">(Verification usually take up to 12 hours or more)</div>
          </div>
          <div>
            <button @click="showImageOnPopUp('document')" class="ver-action-button">View</button>
            <button v-if="documentVerificationIsPending" @click="selectDocument" class="ver-action-button">Reupload</button>
          </div>
        </div>
        <input type="file" @change="handleDocumentUpload" ref="document" hidden>
      </div>
    </div>
    <app-view-doc v-if="showImage" :imgSrc="this.imgSrc" @close="showImage = false"/>
  </div>
</template>

<script>
  import ViewDoc from "@/components/body/verification/partials/ViewDoc";
  import Verification from "@/apis/Verification";
  import appAlert from "@/components/notification/Alert";
  import Auth from "@/apis/Auth";
  export default {
    data(){
      return{
        photo: null,
        document: null,
        uploading: {
          photo: false,
          document: false
        },
        alert: { present: false, type: null, message: null },
        showImage: false,
        imgSrc: null
      }
    },
    methods: {
      selectPhoto(){
        if (!this.uploading.photo){
          if (this.$store.state.authUser.files.photo.status){
            if (this.photoVerificationIsPending){
              this.$refs.photo.click();
            }
          }else{
            this.$refs.photo.click();
          }
        }
      },
      selectDocument(){
        if (!this.uploading.document){
          if (this.$store.state.authUser.files.document.status){
            if (this.documentVerificationIsPending){
              this.$refs.document.click();
            }
          }else{
            this.$refs.document.click();
          }
        }
      },
      handlePhotoUpload(event){
        if (!this.uploading.photo){
          this.photo = event.target.files[0];
          if (this.photo){
            this.uploadSelectedPhoto();
          }
        }
      },
      handleDocumentUpload(event){
        if (!this.uploading.document){
          this.document = event.target.files[0];
          if (this.document){
            this.uploadSelectedDocument();
          }
        }
      },
      uploadSelectedPhoto(){
        this.uploading.photo = true;
        const formData = new FormData();
        formData.append('type', 'photo')
        formData.append('file', this.photo, this.photo.name)
        Verification.uploadPhoto(formData)
          .then(res => {
            this.clearPhotoUploadProgress();
            this.alert = { present: true, type: 'success', message: res.data.message };
          })
          .then(() => {
            Auth.user()
              .then(res => {
                this.$store.commit('updateUserDetails', res.data.data);
              });
          })
          .catch(err => {
            this.clearPhotoUploadProgress();
            this.alert = { present: true, type: 'error', message: err.response.data.message ?? 'Something went wrong' };
          });
      },
      uploadSelectedDocument(){
        this.uploading.document = true;
        const formData = new FormData();
        formData.append('type', 'document')
        formData.append('file', this.document, this.document.name)
        Verification.uploadDocument(formData)
          .then(res => {
            this.clearDocumentUploadProgress();
            this.alert = { present: true, type: 'success', message: res.data.message };
          })
          .then(() => {
            Auth.user()
                .then(res => {
                  this.$store.commit('updateUserDetails', res.data.data);
                });
          })
          .catch(err => {
            this.clearDocumentUploadProgress();
            this.alert = { present: true, type: 'error', message: err.response.data.message ?? 'Something went wrong' };
          });
      },
      showImageOnPopUp(type){
        this.showImage = true;
        this.imgSrc = type === 'photo' ? this.$store.state.authUser.files.photo.url : this.$store.state.authUser.files.document.url;
      },
      clearPhotoUploadProgress(){
        this.uploading.photo = false;
        this.$store.state.uploadProgress.photo = 0;
        this.alert = { present: false, type: null, message: null };
      },
      clearDocumentUploadProgress(){
        this.uploading.document = false;
        this.$store.state.uploadProgress.document = 0;
        this.alert = { present: false, type: null, message: null };
      },
      getVerificationStatus(status){
        if (status === 'pending'){
          return { class: 'text-warning', message: "Verification Pending" };
        }else if (status === 'approved'){
          return { class: 'text-success', message: "Document Verified" };
        }else if (status === 'declined'){
          return { class: 'text-danger', message: "Verification Decline" };
        }
        return { class: null, message: null};
      },
    },
    components: {
      appViewDoc: ViewDoc,
      appAlert
    },
    computed: {
      getPhotoVerificationStatus(){
        let status = this.$store.state.authUser.files.photo.status;
        return this.getVerificationStatus(status);
      },
      getDocumentVerificationStatus(){
        let status = this.$store.state.authUser.files.document.status;
        return this.getVerificationStatus(status);
      },
      photoVerificationIsPending(){
        return this.$store.state.authUser.files.photo.status === 'pending';
      },
      documentVerificationIsPending(){
        return this.$store.state.authUser.files.document.status === 'pending';
      },
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