import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TestBtn extends Vue {

    handle(ev: any) {
        this.$emit('click', ev);
    };

}