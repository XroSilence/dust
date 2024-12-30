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
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: require('react/package.json').version
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