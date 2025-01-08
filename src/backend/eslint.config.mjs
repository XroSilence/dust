export default {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-refresh'],
  root: true,
  globals: {
    React: true
  },
  ignorePatterns: ['dist'],
  env: {
    browser: true,
    es2019: true,
    es2015: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    // ecmaVersion is correctly spelled; consider adjusting linter settings to avoid false positives.
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      rules: {
        'react/prop-types': 'off',
        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: true
          }
        ]
      }
    }
  ]
}