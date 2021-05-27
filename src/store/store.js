import Vue from 'vue';
import Vuex from 'vuex';
// import { modal } from "@/main";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isSticky: false,
        isAuthenticated: !! localStorage.getItem('auth'),
        authUser: JSON.parse(localStorage.getItem('user_details')) || null,
        activeCurrency: JSON.parse(localStorage.getItem('currency_active')) || {name: "Bitcoin", abbr: "BTC"},
        currencies: [
            {name: "Bitcoin", abbr: "BTC"},
            {name: "Ethereum", abbr: "ETH"},
            {name: "Litecoin", abbr: "LTC"},
            {name: "Bitcoin Cash", abbr: "BCH"},
            {name: "Ripple", abbr: "XRP"}
        ],
        navbarToggled: false,
        showTradeWindowLoader: false,
        showUserDropdown: false,
        showActionLoader: false,
        uploadProgress: { photo: 0, document: 0 }
    },
    getters: {
        getSticky: state => {
            return state.isSticky;
        },
        getActiveCurrency: state => {
            return state.activeCurrency;
        },
        getCurrencies: state => {
            return state.currencies;
        },
        getNavbarStatus: state => {
            return state.navbarToggled;
        },
        showTradeWindowLoader: state => {
            return state.showTradeWindowLoader;
        },
        getShowUserDropdown: state => {
            return state.showUserDropdown;
        }
    },
    mutations: {
        setSticky: (state, payload) => {
            state.isSticky = payload;
        },
        setActiveCurrency: (state, payload) => {
            localStorage.setItem('currency_active', JSON.stringify(payload));
            state.activeCurrency = payload;
        },
        toggleNavbar: (state) => {
            state.navbarToggled = !state.navbarToggled;
        },
        toggleShowUserDropdown: state => {
            state.showUserDropdown =  !state.showUserDropdown;
        },
        showTip: (state, event) => {
            event.target.classList.add('display-tooltip');
        },
        hideTip: (state, event) => {
            event.target.classList.remove('display-tooltip');
        },
        setTradeWindowLoaderStatus: (state, status) => {
            state.showTradeWindowLoader = status;
        },
        hideNavigations: state => {
            state.navbarToggled = false;
            state.showUserDropdown = false;
        },
        logUserIn: (state, payload) => {
            localStorage.setItem('user_details', JSON.stringify(payload));
            localStorage.setItem('auth', 'true');
            state.authUser = payload;
            state.isAuthenticated = true;
        },
        logUserOut: state => {
            localStorage.removeItem('user_details');
            localStorage.removeItem('auth');
            state.authUser = null;
            state.isAuthenticated = false;
        },
        updateUserDetails: (state, payload) => {
            localStorage.setItem('user_details', JSON.stringify(payload));
            state.authUser = payload;
        },
        setConfirmationBox: (state, payload) => {
            this.$modal.show('dialog', {
                title: payload.title,
                text: payload.text,
                buttons: [
                    // {
                    //     title: 'Cancel',
                    //     handler: () => {
                    //         modal.hide('dialog')
                    //     }
                    // },
                    {
                        title: payload.button,
                        handler: () => {
                            alert('Repost action')
                        }
                    }
                ]
            })
        }
    },
    actions: {
        setTradeWindowLoaderStatus: (context, status) => {
            context.commit('setTradeWindowLoaderStatus', status);
        }
    }
});