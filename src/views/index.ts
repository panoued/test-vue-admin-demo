import { Component, Watch } from 'vue-property-decorator';
import NavigationVue from '@/service/NavigationVue';
import { PermitService } from '@/service/PermitService';

@Component
export default class IndexView extends NavigationVue {

    routes: any[] = [{ name: 'HomeView', fullPath: '/' }];

    get metas() {
        return require('@/router/metas.json');
    };

    get keepAlive() {
        const res = [];
        for (const key in this.metas) {
            if (this.metas[key].keepalive) {
                res.push(key);
            };
        };
        return res;
    };

    get menu() {
        const res = [];
        const menus = require('@/router/menus.json');
        const permit = (name: string) => {
            if (!name) {
                return false;
            } else {
                const meta = this.metas[name];
                const auth = meta ? meta.auth : null;
                return PermitService.pass(auth);
            };
        };
        for (const item of menus) {
            if (item.name) {
                if (permit(item.name)) {
                    res.push(item);
                };
            } else if (item.children) {
                item.children = item.children.filter((child: any) => permit(child.name));
                if (item.children.length > 0) {
                    res.push(item);
                };
            };
        };
        return res;
    };

    isActive(fullPath: string) {
        return fullPath == this.$route.fullPath ? 'active' : '';
    };

    handle(item: any) {
        if (item.children && item.children.length > 0) {
            console.log('has children');
        } else if (item.name) {
            const route: any = { name: item.name };
            this.$router.push(route);
        };
    };

    getName(item: any) {
        return this.$t(item.name) || item.name;
    };

    @Watch('$route')
    onRouteChange(to: any) {
        if (!this.routes.map(item => item.fullPath).includes(to.fullPath)) {
            this.routes.push(to);
        };
    };

    created() {
        this.onRouteChange(this.$route);
    };

}
