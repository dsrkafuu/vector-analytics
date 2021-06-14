import { h, render } from 'vue';

import AMessage from '@/components/AMessage.vue';
import { console } from '@/utils/console';

// mount `AMessage` component directly to body
// which needs to import used components manually
const vm = h(AMessage);
render(vm, document.createElement('div'));
const ctx = vm.component.ctx;
if (!ctx.triggerMessage) {
  console.error('message component context not found', vm.component);
}

/**
 * trigger a default info message
 * @param {string} text
 */
export const $info = (text = '') => {
  ctx.triggerMessage({ type: 'default', text });
};
/**
 * trigger an error message
 * @param {string} text
 */
export const $error = (text) => {
  ctx.triggerMessage({ type: 'error', text });
};

export default {
  /**
   * @param {import('vue').App} app
   */
  install(app) {
    app.config.globalProperties.$info = $info;
    app.config.globalProperties.$error = $error;
  },
};
