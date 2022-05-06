import './assets/scss/index.scss';
import './assets/css/index.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import './plugins/install';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
