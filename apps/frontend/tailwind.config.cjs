/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.tsx"],
  // @ts-ignore
  presets: [require("@turbo-web3/tailwind-config")],

  plugins: [require("daisyui")],
};

module.exports = config;
