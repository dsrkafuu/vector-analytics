/**
 * @param {string} filename
 * @return {string}
 */
function getComponentName(filename) {
  return filename
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');
}

/**
 * @param {Vue} Vue vue constructor
 * @param {Object} files files object from `import.meta.globEager`
 */
function registerComponent(Vue, files) {
  Object.keys(files).forEach((filename) => {
    const component = files[filename];
    filename = getComponentName(filename);
    Vue.component(filename, component.default || component);
  });
}

export default {
  /**
   * @param {Vue} Vue
   */
  install(Vue) {
    const basics = import.meta.globEager('../components/basic/*.vue');
    console.log(basics);
    const derives = import.meta.globEager('../components/derived/*.vue');
    registerComponent(Vue, basics);
    registerComponent(Vue, derives);
  },
};
