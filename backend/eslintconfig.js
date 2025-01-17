export default {  
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",

  ],
  
  plugins: ["@vitejs","node", "react"],

  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
    project: "./tsconfig.json"
  },

  settings: {
    "import/resolver": {
      node: {
        extensions: [".jsx", ".js", ".ts", ".tsx"],
        alwaysTryTypes: false
      }
    },

    react: {
      version: "detect",
    }
  },
  overrides: [
    {
      files: ["./**/*.{ts,tsx,js,jsx}"],
      rules: {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off"
      }
    }
  ],
  ignorePatterns: ["dist/*", "node_modules/*",],
  rules: {
    // Custom rules can be added here
  }
};






