/*! aofuji-analytics | DSRKafuU (https://dsrkafuu.su) | Copyright (c) MIT License */

import Vue from 'vue';
Vue.config.productionTip = false;
import router from './router';
import store from './store';

// styles
import 'normalize.css';
import './scss/index.scss';

// icons
import icons from './plugins/icons';
Vue.use(icons);

// components
import components from './plugins/components';
Vue.use(components);
import message from './plugins/message';
Vue.use(message);

// plugins
import axios from './plugins/axios';
Vue.use(axios);

// directives
import clickout from './directives/clickout';
Vue.directive('clickout', clickout);

import App from './App.vue';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
