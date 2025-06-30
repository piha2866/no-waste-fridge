import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import jest from 'eslint-plugin-jest';

export default [
  // ESLint core
  {
    ignores: ['node_modules', 'dist', 'build'],
  },

  // TypeScript plugin with recommended settings
  ...tseslint.configs.recommended,
  //   ...tseslint.configs.recommendedTypeChecked,
  //   ...tseslint.configs.stylisticTypeChecked,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-native': eslintPluginReactNative,
      prettier: eslintPluginPrettier,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      // React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // React Native
      'react-native/no-inline-styles': 'warn',
      'react-native/no-raw-text': 'error',
      'react-native/no-unused-styles': 'warn',

      // TypeScript
      'no-console': 'warn',
      'no-empty': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',

      // Prettier
      'prettier/prettier': 'error',

      //Import export sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/__tests__/**/*.ts', '**/*.test.ts', '**/*.test.tsx'],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        // Add Jest globals like describe, test, expect, etc.
        jest: true,
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
      },
    },
    rules: {
      // 🧪 Recommended Jest rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'jest/expect-expect': 'warn',
      'jest/no-deprecated-functions': 'warn',
      'jest/no-conditional-expect': 'warn',
      'jest/prefer-hooks-in-order': 'warn',
      'jest/prefer-strict-equal': 'warn',
    },
  },
];
