import store from '@/store';

export class VuexUtils {

    static getConfig() {
        return store.state.config;
    };

    static setConfig(config: AppConfig) {
        store.commit('setConfig', config)
    };

    static getToken() {
        return store.state.token;
    };

    static setToken(token: string) {
        store.commit('setToken', token);
    };

    static hasToken() {
        return !!VuexUtils.getToken();
    };

    static getLang() {
        return store.state.lang;
    };

    static setLang(lang: LangId) {
        store.commit('setLang', lang);
    };

    static setLangMap(map: { [key: string]: string }) {
        store.commit('setLangMap', map);
    };

    static getLangMap() {
        return store.state.langMap;
    };

    static setMapKey(mapKey: string) {
        store.commit('setMapKey', mapKey);
    };

    static getMapKey() {
        return store.state.mapKey;
    };

}