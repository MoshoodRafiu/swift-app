import Api from "@/apis/Api";
import Csrf from "@/apis/Csrf";

export default {
    async updateProfile(credentials){
        await Csrf.getCookie();
        return Api.post('profile/update', credentials);
    },
    async updatePassword(credentials){
        await Csrf.getCookie();
        return Api.post('password/update', credentials);
    },
    async createPin(credentials){
        await Csrf.getCookie();
        return Api.post('pin/store', credentials);
    },
    async updatePin(credentials){
        await Csrf.getCookie();
        return Api.post('pin/update', credentials);
    },
}