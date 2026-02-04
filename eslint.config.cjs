const js = require('@eslint/js');
const globals = require('globals');
const { defineConfig } = require('eslint/config');
const nodePlugin = require('eslint-plugin-n');

module.exports = defineConfig([
  nodePlugin.configs['flat/recommended-script'],
  {
    rules: {
      'n/exports-style': ['error', 'module.exports'],
      'n/no-unsupported-features/node-builtins': 'off', //fetch and a lot of good things are here
      'n/no-extraneous-require': 'off', //a few libraries use this
      'n/no-unpublished-require': 'off' //a few local calls use this
    }
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.node // This includes 'process' and other Node.js globals
        // globals.browser
      }
    }
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' }
  }
]);
