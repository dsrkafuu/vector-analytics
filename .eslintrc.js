module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    'plugin:vue/recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': 'off',
  },
};
