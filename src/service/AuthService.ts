import { VuexUtils } from "@/utils/VuexUtils";
import VueRouter, { Route } from "vue-router";

export class AuthService {

    static isDev = process.env.NODE_ENV == 'development';

    static key = 'userToken';

    static setToken(token: string, expires_time: string) {
        localStorage.setItem(AuthService.key, JSON.stringify({ token, expires_time }));
        VuexUtils.setToken(token);
    };

    static getToken() {
        return VuexUtils.getToken();
    };

    static hasToken() {
        return VuexUtils.hasToken();
    };

    static rmToken() {
        VuexUtils.setToken(undefined);
        localStorage.removeItem(AuthService.key);
    };

    static login(router: VueRouter, to: Route) {
        return new Promise<void>(resolve => {
            const token = AuthService.getToken();
            if (!token) {
                const isWechat = /micromessenger/i.test(navigator.userAgent);
                if (isWechat) {

                } else {

                };
            } else {
                resolve();
            };
        });
    };

    static init() {
        const tokenStr = localStorage.getItem(AuthService.key);
        try {
            const { token, expires_time } = JSON.parse(tokenStr);
            const expired = new Date(expires_time) < new Date();
            if (!!token && !expired) {
                VuexUtils.setToken(token);
            };
        } catch (err) { };
    };

}