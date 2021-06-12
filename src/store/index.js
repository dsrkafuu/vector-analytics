import { createStore } from 'vuex';

import theme from './theme';
import common from './common';
import dashboard from './dashboard';
import realtime from './realtime';
import settings from './settings';

const store = createStore({
  modules: {
    theme,
    common,
    dashboard,
    realtime,
    settings,
  },
});

export default store;
