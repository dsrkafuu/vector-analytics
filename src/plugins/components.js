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
 * @param {import('vue').App} app
 * @param {Object} files files object from `import.meta.globEager`
 */
function registerComponent(app, files) {
  Object.keys(files).forEach((filename) => {
    const component = files[filename];
    filename = getComponentName(filename);
    app.component(filename, component.default || component);
  });
}

export default {
  /**
   * @param {import('vue').App} app
   */
  install(app) {
    const basics = import.meta.globEager('../components/basic/*.vue');
    const derives = import.meta.globEager('../components/derived/*.vue');
    registerComponent(app, basics);
    registerComponent(app, derives);
  },
};
