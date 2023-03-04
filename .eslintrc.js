/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["eslint-config-turbo-web3"], // uses the config in `packages/config/eslint`
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["**/smartcontracts/**/*.ts"],
  parserOptions: {
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    project: [
      "./tsconfig.json",
      "./apps/*/tsconfig.json",
      "./packages/*/tsconfig.json",
    ],
  },
  settings: {
    next: {
      rootDir: ["apps/nextjs"],
    },
  },
};

module.exports = config;
