import js from '@eslint/js'
import globals from 'globals'
import jest from 'eslint-plugin-jest'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  {
    files: ['__tests__/**/*.js'],
    plugins: { jest },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    ignores: ['node_modules/', 'coverage/'],
  },
]
