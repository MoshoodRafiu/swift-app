import Home from "@/components/body/Home";
import Login from "@/components/auth/Login";
import Trades from "@/components/body/trades/Trades";
import Profile from "@/components/body/profile/Profile";
import Verification from "@/components/body/verification/Verification";
import Wallets from "@/components/body/wallets/Wallets";
import Adverts from "@/components/body/adverts/Adverts";
import Deposit from "@/components/body/wallets/Deposit";
import Withdraw from "@/components/body/wallets/Withdraw";
import InitiateBuy from "@/components/body/initiate-trade/Buy";
import InitiateSell from "@/components/body/initiate-trade/Sell";
import Register from "@/components/auth/Register";
import ForgotPassword from "@/components/auth/ForgotPassword";
import ChangePassword from "@/components/auth/ChangePassword";
import PageNotFound from "@/components/404";
export const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/trades',
        component: Trades,
        name: 'trades'
    },
    {
        path: '/profile',
        component: Profile,
        name: 'profile'
    },
    {
        path: '/verifications',
        component: Verification,
        name: 'verifications'
    },
    {
        path: '/adverts',
        component: Adverts,
        name: 'adverts'
    },
    {
        path: '/wallets',
        component: Wallets,
        name: 'wallets'
    },
    {
        path: '/wallets/:coin/deposit',
        component: Deposit,
        name: 'deposit'
    },
    {
        path: '/wallets/:coin/withdraw',
        component: Withdraw,
        name: 'withdraw'
    },
    {
        path: '/:coin/buy',
        component: InitiateBuy,
        name: 'buy'
    },
    {
        path: '/:coin/sell',
        component: InitiateSell,
        name: 'sell'
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    },
    {
        path: '/forgot-password',
        component: ForgotPassword,
        name: 'forgotPassword'
    },
    {
        path: '/password/reset',
        component: ChangePassword,
        name: 'changePassword'
    },
    {
        path: '*',
        component: PageNotFound,
        name: '404'
    }
]