import Api from './Api'
import Csrf from "@/apis/Csrf";

export default {
    async register(credentials){
        await Csrf.getCookie();
        return Api.post('register', credentials);
    },
    async login(credentials){
        await Csrf.getCookie();
        return Api.post('login', credentials);
    },
    async logout(){
        await Csrf.getCookie();
        return Api.post('logout');
    },
    async user(){
        await Csrf.getCookie();
        return Api.post('me');
    },
    async requestPasswordResetLink(credentials){
        await Csrf.getCookie();
        return Api.post('password/reset/send-link', credentials);
    },
    async resetPassword(credentials){
        await Csrf.getCookie();
        return Api.post('password/reset', credentials);
    }
}