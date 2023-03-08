const { build } = require("esbuild");
const { Generator } = require("npm-dts");

// const { dependencies, peerDependencies } = require("./package.json");

const shared = {
  entryPoints: ["typechain-types/index.ts"],

  bundle: true,
  // No dependencies are bundled
  // external: Object.keys(dependencies),
};

/**
 * Export typechain types
 */

build({
  ...shared,

  outfile: "dist/index.js",
});

build({
  ...shared,

  outfile: "dist/index.mjs",

  format: "esm",
});

new Generator({
  entry: "typechain-types/index.ts",

  output: "dist/index.d.ts",
}).generate();

const shared2 = {
  entryPoints: ["network-mapping.ts"],

  bundle: true,
  // No dependencies are bundled
  // external: Object.keys(dependencies),
};

/**
 * Export smart contracts network mappings
 */

build({
  ...shared2,

  outfile: "dist/network-mapping/index.js",
});

build({
  ...shared2,

  outfile: "dist/network-mapping/index.mjs",

  format: "esm",
});

new Generator({
  entry: "network-mapping/index.ts",

  output: "dist/network-mapping/index.d.ts",
}).generate();
