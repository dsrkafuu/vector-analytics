module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL || '/',

  // dev server proxy
  devServer: {
    port: process.env.SERVER_PORT || 3000,
    proxy: {
      '/api': {
        target: `http://127.0.0.1:3022`,
        changeOrigin: true,
      },
    },
  },

  // inject css variables
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@use "sass:math"; @import "@/scss/variables.scss";',
      },
    },
  },

  // custom svg loader
  chainWebpack: (config) => {
    // svg inject loader
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
