import { Component } from 'vue-property-decorator';
import BaseVue from '@/service/BaseVue';
import { AuthService } from '@/service/AuthService';

@Component
export default class Login extends BaseVue {

    login() {
        const redirect = this.$route.query.redirect;
        const target = redirect ? decodeURI(redirect) : this.$paths.HomeView;
        AuthService.setToken('token', Date.now() + '');
        this.$router.push(target);
    };

}