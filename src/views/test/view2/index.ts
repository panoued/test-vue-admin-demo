import { Component } from 'vue-property-decorator';
import BaseVue from '@/service/BaseVue';

@Component
export default class TestView2 extends BaseVue {

    count = 0;

    visible = false;

    selected = 0;

    get title() {
        return this.$t('TestView2');
    };

    get content() {
        return this.selected > 0 ? `已选择：${this.selected}` : '';
    };

    showPopup() {
        this.visible = true;
    };

    select(i: number) {
        this.selected = i;
        this.visible = false;
    };

    created() {
        setInterval(() => this.count++, 1000);
    };

}