import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "typechain-types/index": "typechain-types/index.ts",
    "network-mapping/index": "network-mapping/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  splitting: false,
  minify: false,
  tsconfig: "./tsconfig.json",
});
