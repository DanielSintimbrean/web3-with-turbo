/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  ignorePatterns: ["*.js", "typechain-types", "dist"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  parserOptions: {
    project: "./apps/smartcontracts/tsconfig.json",
  },
  env: {
    node: true,
  },
  rules: {
    // custom rules
  },
};

module.exports = config;
