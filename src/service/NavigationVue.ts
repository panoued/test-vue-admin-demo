import { Component, Watch } from 'vue-property-decorator';
import BaseVue from './BaseVue';
import { Animated } from '@/enums/Animated';
import { Route } from 'vue-router';

@Component
export default class NavigationVue extends BaseVue {

    static isPush: boolean = null;

    enter: string = '';

    leave: string = '';

    routerLength = 1;

    isMounted = true;

    onRouteChanged(_to: Route, _from: Route) { };

    getRoutesLength(): number {
        try {
            return this['$navigation'].getRoutes().length;
        } catch {
            return 0;
        };
    };

    @Watch('$route')
    onRouteChangedFunc(to: Route, from: Route) {
        const length = this.getRoutesLength();
        const isPush = typeof NavigationVue.isPush == 'boolean' ? NavigationVue.isPush : length >= this.routerLength;
        if (!!length && this.isMounted) {
            this.enter = isPush ? Animated.slideInRight : Animated.slideInLeft;
            this.leave = isPush ? Animated.slideOutLeft : Animated.slideOutRight;
        };
        this.onRouteChanged(to, from);
        this.routerLength = length;
        NavigationVue.isPush = null;
    };

    created() {
        this.routerLength = this.getRoutesLength();
        NavigationVue.rmAnimated = () => {
            this.enter = '';
            this.leave = '';
            this.isMounted = false;
            setTimeout(() => {
                this.isMounted = true;
            }, 300);
        };
        NavigationVue.router = this.$router;
    };

    private static router = null;

    private static rmAnimated: Function = null;

    static replace(location: any) {
        NavigationVue.rmAnimated();
        NavigationVue.router.replace(location);
    };

}
