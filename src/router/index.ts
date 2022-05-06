import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexView from '@/views';
import { RouteNameList } from '@/utils/enums/RouteNameList';
import { PermitService } from '@/service/PermitService';
import { AuthService } from '@/service/AuthService';

Vue.use(VueRouter);

function randomKey() {
    const t = 'xxxxxxxx';
    return t.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const importRoute = require('./import.' + process.env.NODE_ENV);

const routeJson: any[] = require('./routes.json');
const metaJson: any[] = require('./metas.json');

const allRoute = routeJson.map((r: any) => {
    r.component = importRoute(r.component);
    return r;
});

const layout = [RouteNameList.Login, RouteNameList.PermissionError], layouts = [], children = [];

allRoute.forEach(route => {
    if (layout.includes(route.name)) {
        layouts.push(route);
    } else {
        children.push(route);
    };
});

children.forEach(child => {
    const meta = metaJson[child.name];
    if (meta) {
        child.meta = meta;
    };
});

const routes: any[] = [
    {
        path: '/',
        component: IndexView,
        children
    },
    ...layouts
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const loginView = (fullPath: string) => ({ name: RouteNameList.Login, query: { redirect: encodeURI(fullPath) } });
    function toNext() {
        if (to.meta && to.meta.multiple && !to.query.VNK) {
            next({ path: to.path, query: Object.assign(to.query, { VNK: randomKey() }) })
        } else {
            next();
        };
    };
    if (to.meta.auth) {
        const isLogin = AuthService.hasToken();
        if (isLogin) {
            const pass = PermitService.pass(to.meta.auth);
            if (pass) {
                toNext();
            } else {
                next({ name: RouteNameList.PermissionError });
            };
        } else {
            next(loginView(to.fullPath));
        };
    } else {
        toNext();
    };
});

export default router;
