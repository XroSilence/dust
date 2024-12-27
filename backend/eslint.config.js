// <!Extends ./eslint.config.js (.cjs, .mjs, .js, .jsx, .ts, .tsx)in the root directory  */
// {
//   "env": {
//     "browser": true,
//     "es2020": true,
//     "node": true
//   },
//   "extends": [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:react/jsx-runtime",
//     "plugin:react-hooks/recommended",
//     "./eslint.config.js"
//   ],
//   "parserOptions": {
//     "ecmaVersion": 2020,
//     "sourceType": "module",    
//     "ecmaFeatures": {
//       "jsx": true
//     }
//   },
//   "settings": {
//     "react": {
//       "version": "18.2.0"
//     }
//   },
//   "rules": {
//     "react/prop-types": "off",
//     "react-refresh/only-export-components": [
//       "warn",
//       {
//         "allowConstantExport": true
//       }
//     ]
//   }  
// }    
module.exports = {
    root: true, 
    ignores : ['dist'],   
    env: {
      browser: true,
      es2020: true,
      node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      './eslint.config.js'
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
    version: '18.2.0'
    }
    },
    rules: {
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
    'warn',
    {
    allowConstantExport: true    
    }
    ]
    },
    overrides: [{
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
    }]
};