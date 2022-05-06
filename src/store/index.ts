import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state: VuexState = {
    config: null,
    token: '',
    lang: 'zh-HK',
    langMap: {},
    mapKey: ''
};

export default new Vuex.Store({
    state,
    mutations: {
        setConfig(state, config) {
            state.config = config;
        },
        setToken(state, token) {
            state.token = token;
        },
        setLang(state, lang) {
            state.lang = lang;
        },
        setLangMap(state, langMap) {
            state.langMap = langMap;
        },
        setMapKey(state, mapKey) {
            state.mapKey = mapKey;
        }
    },
    actions: {
    },
    modules: {
    }
});
