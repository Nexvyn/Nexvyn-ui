import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default [
  {
    ignores: [
      '**/.source/**',
      '**/.next/**',
      '**/node_modules/**',
      '**/out/**',
      '**/build/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Basic rules - Next.js specific rules can be added later
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off', // Turn off base rule as it conflicts with @typescript-eslint version
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'warn', // Allow 'any' type but warn about it
      '@typescript-eslint/no-empty-object-type': 'warn', // Allow empty object types but warn
    },
  },
];

