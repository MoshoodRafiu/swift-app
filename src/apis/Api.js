import axios from "axios"
import {store} from "@/store/store";
import router from '../router';

const Api = axios.create({
    baseURL: 'http://localhost:8000/'
    // baseURL: 'http://api.swifthrive.com/',
});

Api.defaults.withCredentials = true;
Api.interceptors.response.use(res => {
    return Promise.resolve(res);
}, err => {
    if (err.response.status === 401){
        store.commit('logUserOut');
        if (router.currentRoute.name !== 'home'){
            router.push({name: 'home'}).then();
        }
    }
    return Promise.reject(err);
})

export default Api;