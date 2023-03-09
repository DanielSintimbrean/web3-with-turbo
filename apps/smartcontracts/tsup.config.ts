import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "typechain-types/index": "typechain-types/index.ts",
    "network-mapping/index": "network-mapping/index.ts",
  },
  skipNodeModulesBundle: true,
  bundle: true,
  minify: true,
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  target: "es2020",
});
