import { Component, Watch, Model, Vue } from 'vue-property-decorator';

@Component
export default class PopupBase extends Vue {

    @Model('visibleChange', { type: Boolean, default: false }) visible: boolean;

    block = false;

    show() {
        history.pushState(history.state, '', this.$route.fullPath);
        window.addEventListener('popstate', this.end);
        document.body.style.overflow = 'hidden';
    };

    hide() {
        this.$emit('visibleChange', false);
    };

    end() {
        this.block = true;
        this.$emit('visibleChange', false);
        document.body.style.overflow = '';
        window.removeEventListener('popstate', this.end);
        setTimeout(() => this.block = false, 300);
    };

    @Watch('visible')
    onVisibleChange(visible: boolean) {
        if (visible) {
            this.show();
        } else {
            if (!this.block) {
                this.block = true;
                history.back();
                setTimeout(() => this.block = false, 300);
            };
        };
    };

    created() {
        if (this.visible) {
            this.show();
        };
    };

}