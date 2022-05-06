import { Component, Vue } from 'vue-property-decorator';
import { VuexUtils } from '@/utils/VuexUtils';
import { StringUtils } from '@/utils/StringUtils';
import { RoutePathList } from '@/utils/enums/RoutePathList';
import { ThemeColor } from '@/utils/enums/ThemeColor';
import { DateUtils } from '@/utils/DateUtils';

@Component
export default class BaseVue extends Vue {

    loading = false;

    finished = false;

    refreshing = false;

    prev: string = '';

    VNK = '';

    get langMap() {
        return VuexUtils.getLangMap();
    };

    get $paths() {
        return RoutePathList;
    };

    get $color() {
        return ThemeColor;
    };

    get $date() {
        return DateUtils;
    };

    back(step: number) {
        if (step && typeof step == 'number') {
            this.$router.go(-Math.abs(step));
        } else {
            this.$router.back();
        };
    };

    $t(key: LangKeys) {
        return this.langMap[key] || '';
    };

    $r(key: LangKeys, ...vals: Array<string | number>) {
        let res = this.$t(key);
        for (let i = 0; i < vals.length; i++) {
            res = res.replace(new RegExp(`\\{${i}\\}`), vals[i] + '');
        };
        return res;
    };

    $tr(key: LangKeys, ...valKeys: LangKeys[]) {
        const vals = valKeys.map(key => this.$t(key));
        return this.$r(key, ...vals);
    };

    push(path: string, query: any = {}, setPrev = true, replace = false) {
        if (setPrev) {
            Object.assign(query, { prev: this.prev || this.VNK });
        };
        if (replace) {
            this.$router.replace({ path, query });
        } else {
            this.$router.push({ path, query });
        };
    };

    ft(s: string | number) {
        const c = Number(s);
        return c < 10 ? '0' + s : '' + s;
    };

    debounce(callback: Function, time = 2000) {
        if (!this.loading) {
            this.loading = true;
            callback();
            setTimeout(() => this.loading = false, time);
        };
    };

    cutNumber(str: string, hasPoint = false, hasMinusSign = false) {
        return StringUtils.cutNumber(str, hasPoint, hasMinusSign)
    };

    randomKey(radix = 16) {
        const t = 'xxxxxxxx';
        return t.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(radix);
        });
    };

    ref<T = HTMLElement>(key: string): T {
        const refs: any = this.$refs[key];
        return refs;
    };

    assign<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    };

    created() {
        this.VNK = this.$route.query.VNK;
        this.prev = this.$route.query.prev;
    };

    private static map = new Map<string, any>();

    private static updates = new Map<string, boolean>();

    static getVnk(to: any) {
        return to.query.VNK;
    };

    static setMap<T = any>(vnk: string, data: T) {
        BaseVue.map.set(vnk, data);
    };

    static getMap<T = any>(vnk: string): T {
        return BaseVue.map.get(vnk);
    };

    static hasMap(vnk: string) {
        return this.map.has(vnk);
    };

    static rmMap(vnk?: string) {
        if (vnk) {
            this.map.delete(vnk);
        } else {
            this.map.clear();
        };
    };

    static guard(to: any, action: () => Promise<any>, next: (to?: any) => void) {
        const vnk = BaseVue.getVnk(to);
        if (this.hasMap(vnk)) {
            next();
        } else {
            action().then(res => {
                BaseVue.setMap(vnk, res.data);
                next();
            }).catch(() => { });
        };
    };

    static update(key: string) {
        BaseVue.updates.set(key, true);
    };

    static refresh(key: string, callback: Function) {
        const v = BaseVue.updates.get(key);
        if (v && typeof callback == 'function') {
            BaseVue.updates.set(key, false);
            callback();
        };
    };

}