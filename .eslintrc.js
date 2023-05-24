module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential',
    '@vue/airbnb'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'max-len': ['error', 150, { ignoreUrls: true }],
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
  },
};
