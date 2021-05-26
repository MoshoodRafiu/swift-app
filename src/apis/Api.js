import axios from "axios"

const Api = axios.create({
    baseURL: 'http://localhost:8000/'
});

Api.defaults.withCredentials = true;
Api.interceptors.response.use(undefined, err => {
    if (err.response.status === 401){
        this.$store.commit('logUserOut');
        if (this.$route.name !== 'home'){
            this.$router.push({name: 'home'}).then();
        }
    }
})

export default Api;