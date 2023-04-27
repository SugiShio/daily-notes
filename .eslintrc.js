module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: ['jest'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unreachable': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-useless-return':
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'vue/order-in-components':
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
}
