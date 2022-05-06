import { Component } from 'vue-property-decorator';
import BaseVue from '@/service/BaseVue';

@Component
export default class TestView1 extends BaseVue {

    get title() {
        return this.$t('TestView1');
    };

    toTest2() {
        this.$router.push(this.$paths.TestView2);
    };

}