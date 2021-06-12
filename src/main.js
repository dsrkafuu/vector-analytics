/*! aofuji-analytics | DSRKafuU (https://dsrkafuu.su) | Copyright (c) MIT License */

// styles
import 'normalize.css';
import './scss/index.scss';

// init app
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

// store
import store from './store';
app.use(store);

// router
import router from './router';
app.use(router);

// icons
import icons from './plugins/icons';
app.use(icons);

// components
import components from './plugins/components';
app.use(components);

import message from './plugins/message';
app.use(message);

// plugins
import axios from './plugins/axios';
app.use(axios);

// directives
import clickout from './directives/clickout';
app.directive('clickout', clickout);

// mount app
app.mount('#app');
