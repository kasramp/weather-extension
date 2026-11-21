import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import prettier from 'eslint-config-prettier'

export default [
  { ignores: ['dist', 'dist-zip', 'src/popup/vendor'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, chrome: 'readonly', browser: 'readonly' },
    },
  },
  {
    files: ['*.js'],
    languageOptions: { globals: globals.node },
  },
]
