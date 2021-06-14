import { DOM_PROP_CLICKOUT } from '@/utils/constants';

export default {
  /**
   * init clickout directive
   * @param {Element} el
   * @param {Object} binding
   */
  beforeMount(el, binding) {
    /**
     * handle click outside the element
     * @param {Event} evt
     */
    const handleOutClick = (evt) => {
      // if click self, do nothing
      if (el.contains(evt.target)) {
        return;
      }
      // if handler is passed to `v-clickout`
      if (typeof binding.value === 'function') {
        binding.value(evt);
      }
    };

    // bind handler to document
    document.addEventListener('click', handleOutClick);
    el[DOM_PROP_CLICKOUT] = handleOutClick;
  },

  /**
   * remove directive
   * @param {Element} el
   */
  beforeUnmount(el) {
    document.removeEventListener('click', el[DOM_PROP_CLICKOUT]);
    delete el[DOM_PROP_CLICKOUT];
  },
};
