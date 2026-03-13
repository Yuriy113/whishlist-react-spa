import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist', '*.config.*']),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    react.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    eslintPluginPrettierRecommended,
    eslintConfigPrettier,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            // — Prettier
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            // — ESLint
            curly: ['error', 'all'],
            'no-bitwise': 'off',
            'no-shadow': 'off',
            'no-use-before-define': 'off',
            'padding-line-between-statements': 'off',
            // — React
            'react/react-in-jsx-scope': 'off',
            'react/function-component-definition': [
                2,
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],
            'react/jsx-filename-extension': [
                'error',
                { extensions: ['.jsx', '.tsx'] },
            ],
            'react/jsx-props-no-spreading': 'off',
            'react/require-default-props': 'off',
            'react/prop-types': ['off', {}],
            'react/jsx-curly-newline': 'off',
            'react/boolean-prop-naming': [
                'error',
                { rule: '^(is|has|can)[A-Z]+' },
            ],
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'react-hooks/exhaustive-deps': 'warn',
            // — JSX A11y
            'jsx-a11y/anchor-is-valid': 'off',
            // — TypeScript
            '@typescript-eslint/no-unnecessary-type-constraint': 'off',
            '@typescript-eslint/camelcase': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-extra-semi': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-shadow': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-member-accessibility': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-duplicate-enum-values': 'off',
            // — Simple import sort
            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        ['^\\u0000'],
                        ['^react$', '^@?[a-zA-Z0-9]'],
                        ['^@?\\w'],
                        ['^@/(.*|$)'],
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'warn',
        },
        settings: {
            react: {
                pragma: 'React',
                version: 'detect',
            },
        },
    },
]);
