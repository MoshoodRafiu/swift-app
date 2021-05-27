import Home from "@/components/body/Home";
import Login from "@/components/auth/Login";
import Trades from "@/components/body/trades/Trades";
import Profile from "@/components/body/profile/Profile";
import Verification from "@/components/body/verification/Verification";
import VerifyEmail from "@/components/body/verification/VerifyEmail";
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
        name: 'home',
    },
    {
        path: '/trades',
        component: Trades,
        name: 'trades',
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        component: Profile,
        name: 'profile',
        meta: { requiresAuth: true }
    },
    {
        path: '/verifications',
        component: Verification,
        name: 'verifications',
        meta: { requiresAuth: true }
    },
    {
        path: '/email/verify',
        component: VerifyEmail,
        name: 'verifyEmail'
    },
    {
        path: '/adverts',
        component: Adverts,
        name: 'adverts',
        meta: { requiresAuth: true }
    },
    {
        path: '/wallets',
        component: Wallets,
        name: 'wallets',
        meta: { requiresAuth: true }
    },
    {
        path: '/wallets/:coin/deposit',
        component: Deposit,
        name: 'deposit',
        meta: { requiresAuth: true }
    },
    {
        path: '/wallets/:coin/withdraw',
        component: Withdraw,
        name: 'withdraw',
        meta: { requiresAuth: true }
    },
    {
        path: '/:coin/buy',
        component: InitiateBuy,
        name: 'buy',
        meta: { requiresAuth: true }
    },
    {
        path: '/:coin/sell',
        component: InitiateSell,
        name: 'sell',
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: { requiresGuest: true }
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
        meta: { requiresGuest: true }
    },
    {
        path: '/forgot-password',
        component: ForgotPassword,
        name: 'forgotPassword',
        meta: { requiresGuest: true }
    },
    {
        path: '/password/reset',
        component: ChangePassword,
        name: 'changePassword',
        meta: { requiresGuest: true }
    },
    {
        path: '*',
        component: PageNotFound,
        name: '404'
    }
]