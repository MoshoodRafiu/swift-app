import Api from "@/apis/Api";
import Csrf from "@/apis/Csrf";
import {store} from "@/store/store";

export default {
    async resendVerificationEmail(){
        await Csrf.getCookie();
        return Api.post('verification/email/resend');
    },
    async verifyEmail(data){
        await Csrf.getCookie();
        return Api.post('verification/email/verify', data);
    },
    async sendPhoneVerificationCode(data){
        await Csrf.getCookie();
        return Api.post('verification/phone/send', data);
    },
    async verifyPhone(data){
        await Csrf.getCookie();
        return Api.post('verification/phone/verify', data);
    },
    async uploadPhoto(data){
        await Csrf.getCookie();
        return Api.post('verification/document/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                store.state.uploadProgress.photo = Math.round(progressEvent.loaded / progressEvent.total * 100);
            }
        });
    },
    async uploadDocument(data){
        await Csrf.getCookie();
        return Api.post('verification/document/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                store.state.uploadProgress.document = Math.round(progressEvent.loaded / progressEvent.total * 100);
            }
        });
    },
}