import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "typechain-types/index.ts",
    "network-mapping/index": "network-mapping/index.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: true,
  minify: true,
  tsconfig: "./tsconfig.json",
});
