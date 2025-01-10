import type { Linter } from "eslint";

const config: Linter.Config = {
  files: ["**/*.ts"],
  ignores: ["dist/**", "node_modules/**", "*.js"],
  languageOptions: {
    parser: require("@typescript-eslint/parser"),
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      project: "./tsconfig.json",
      ecmaFeatures: {
        globalReturn: true,
      },
    },
  },
  plugins: {
    "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": "warn",
    eqeqeq: ["error", "always"],
    "no-unused-vars": "off", // Disable the base rule as it can give false positives
  },
};

export default config;
