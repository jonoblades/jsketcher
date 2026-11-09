import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const projectGlobals = {
  THREE: 'readonly',
  CSG: 'readonly',
  PNLTRI: 'readonly',
  __DEBUG__: 'readonly',
  __CAD_APP: 'readonly',
  Module: 'readonly',
  _free: 'readonly',
  _malloc: 'readonly',
  writeAsciiToMemory: 'readonly',
  __E0_ENGINE_EXCHANGE_VAL: 'readonly',
  FS: 'readonly',
  out: 'writable',
  verb: 'readonly',
  $: 'readonly'
};

const sharedRules = {
  'comma-dangle': 'off',
  'no-unused-vars': 'off',
  'max-len': 'off',
  'no-console': 'off',
  'no-extra-boolean-cast': 'off',
  'no-useless-assignment': 'off',
  'no-var': 'error',
  'prefer-const': ['error', {destructuring: 'all'}]
};

export default [
  {
    ignores: ['modules/math/optim/*.js', 'modules/math/qr.js']
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {ecmaFeatures: {jsx: true}},
      globals: {...globals.browser, ...globals.node, ...projectGlobals}
    },
    rules: sharedRules
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {parser: tsParser},
    plugins: {'@typescript-eslint': tsPlugin},
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...sharedRules,
      'no-empty': 'off',
      'no-fallthrough': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-extra-semi': 'error',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  }
];
