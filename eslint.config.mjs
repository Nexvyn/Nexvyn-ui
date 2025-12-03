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
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];

