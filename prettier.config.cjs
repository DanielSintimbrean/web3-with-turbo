/** @type {import("prettier").Config & { [key:string]: any }} */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-solidity",
  ],
  tailwindConfig: "./packages/config/tailwind",
  importOrder: [
    "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
    "^(next/(.*)$)|^(next$)",
    "^(expo(.*)$)|^(expo$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@turbo-web3/(.*)$",
    "",
    "^~/utils/(.*)$",
    "^~/components/(.*)$",
    "^~/styles/(.*)$",
    "^~/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  overrides: [
    {
      files: "**/*.sol",
      options: {
        printWidth: 80,
        tabWidth: 4,
        useTabs: false,
        singleQuote: false,
      },
    },
  ],
};

module.exports = config;
