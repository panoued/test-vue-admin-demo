import { Component } from 'vue-property-decorator';
import BaseVue from '@/service/BaseVue';
import { LangUtils } from '@/utils/LangUtils';
import { AuthService } from '@/service/AuthService';

@Component
export default class HomeView extends BaseVue {

    get title() {
        return this.$t('HomePage');
    };

    get lang() {
        return LangUtils.langId == 'zh-HK' ? '繁体' : '简体';
    };

    get routes() {
        const routes: any[] = require('../../router/routes.json');
        return routes.map(route => route.path.split('/').map((str: string) => {
            if (/\:/.test(str)) {
                return Math.floor(Math.random() * 100);
            } else {
                return str;
            };
        }).join('/'));
    };

    toTest1() {
        this.$router.push(this.$paths.TestView1);
    };

    toTest2() {
        this.$router.push(this.$paths.TestView2);
    };

    logout() {
        AuthService.rmToken();
        this.$router.push(this.$paths.Login);
    };

    changeLang() {
        const lang: LangId = LangUtils.langId == 'zh-CN' ? 'zh-HK' : 'zh-CN';
        LangUtils.set(lang);
    };

}