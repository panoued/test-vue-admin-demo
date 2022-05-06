import { Component, Prop } from 'vue-property-decorator';
import PopupBase from '@/service/PopupBase';

@Component
export default class TestPopup extends PopupBase {

    @Prop({ type: String, default: '取消' }) cancel: string;

}