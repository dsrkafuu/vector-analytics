import path from 'path';

import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import svgIcons from 'vite-plugin-svg-icons';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    createVuePlugin(),

    // svg spirit loader
    svgIcons({
      iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
      symbolId: 'icon-[name]',
    }),
  ],

  // project root
  root: path.resolve(__dirname, 'src'),

  // import alias
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // css variable inject
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
          @import "@/scss/variables.scss";
        `,
      },
    },
  },

  // dev api server proxy
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3022',
        changeOrigin: true,
      },
    },
  },
});
