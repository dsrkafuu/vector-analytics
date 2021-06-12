/*! aofuji-analytics | DSRKafuU (https://dsrkafuu.su) | Copyright (c) MIT License */

import { createApp } from 'vue';

// init app
import router from './router';
import store from './store';
import App from './App.vue';

const app = createApp({
  router,
  store,
  ...App,
});

// styles
import 'normalize.css';
import './scss/index.scss';

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
