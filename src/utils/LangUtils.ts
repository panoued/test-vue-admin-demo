import { VuexUtils } from "./VuexUtils";

export class LangUtils {

    private static readonly key = 'LangId';

    static get langId() {
        return VuexUtils.getLang();
    };

    static init() {
        let lang = localStorage.getItem(this.key) as LangId;
        lang = lang == 'zh-CN' ? 'zh-CN' : 'zh-HK';
        VuexUtils.setLang(lang);
        const map = require(`../assets/i18n/${lang}.json`);
        VuexUtils.setLangMap(map);
    };

    static set(lang: LangId) {
        VuexUtils.setLang(lang);
        localStorage.setItem(this.key, lang);
        LangUtils.init();
    };

}