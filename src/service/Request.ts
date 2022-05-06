import axios from "axios";
import { VuexUtils } from "@/utils/VuexUtils";
import { AuthService } from "./AuthService";

export default class Request {

    static getFullUrl(subUrl: string) {
        return process.env.VUE_APP_API + subUrl;
    };

    static getHeaders() {
        const headers: any = {};
        const token = VuexUtils.getToken();
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        };
        return headers;
    };

    static send(apiParams: ApiParams, autoLog?: AutoLog, file?: FormData) {
        const isLog: AutoLog = Object.assign({ success: false, fail: true, loading: false }, autoLog);
        const url = Request.getFullUrl(apiParams.url);
        const method = apiParams.method.toUpperCase() as ApiMethod, payload = method == 'POST' || method == 'PUT';
        const params = payload && !file ? undefined : apiParams.params;
        const data = file ? file : payload ? apiParams.params : undefined;
        const headers = Request.getHeaders();
        if (isLog.loading) {

        };
        return new Promise<any>((resolve, reject) => {
            axios({ url, method, params, data, headers }).then(res => {
                const success = res.data.status == 200;
                if (isLog.loading) {

                };
                if (success) {
                    if (isLog.success) {

                    };
                    resolve(res.data);
                } else {
                    if (res.data.status == 401) {
                        AuthService.rmToken();
                        location.reload();
                    } else if (isLog.fail) {

                        if (res.data.status == 8001) {

                        };
                    };
                    reject(res.data);
                };
            }).catch(err => {
                let msg = '';
                const status = err.status || 404;
                switch (status) {
                    case 999: msg = '网络错误'; break
                    case 400: msg = '请求错误'; break
                    case 401: msg = '未授权, 请登录'; break
                    case 403: msg = '拒绝访问'; break
                    case 404: msg = '请求地址出错'; break
                    case 408: msg = '请求超时'; break
                    case 500: msg = '服务器内部错误'; break
                    case 501: msg = '服务未实现'; break
                    case 502: msg = '网关错误'; break
                    case 503: msg = '服务不可用'; break
                    case 504: msg = '网关超时'; break
                    case 505: msg = 'HTTP版本不受支持'; break
                    default: msg = err.message; break
                };
                if (isLog.loading) {

                };
                if (status == 401) {
                    AuthService.rmToken();
                    location.reload();
                } else if (isLog.fail) {

                    if (status == 8001) {

                    };
                };
                reject(new Error(msg));
            });
        });
    };

};