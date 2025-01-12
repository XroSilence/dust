export default {  
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
root: true,
  
  plugins: ["@typescript-eslint", "react"],

  parser: "@typescript-eslint/parser",
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
      typescript: {
        alwaysTryTypes: true
      }
    },

    react: {
      version: "detect"
    }
  },
  overrides: [
    {
      files: ["./**/*.{ts,tsx,js,jsx}"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-explicit-any": "warn",
        "no-console": "warn"
      }
    }
  ],
  ignorePatterns: ["dist/**", "node_modules/**", "*.js"]
};





