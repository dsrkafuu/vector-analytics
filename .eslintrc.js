module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 'plugin:vue/vue3-recommended',
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/prettier',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': 'off',
    'vue/attribute-hyphenation': 'off',
  },
};
