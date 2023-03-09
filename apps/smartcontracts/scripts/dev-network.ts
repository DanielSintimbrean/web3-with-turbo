import { hardhatArguments, run } from "hardhat";

/**
 * This script starts a Hardhat node and deploys the contracts to it.
 * Used to test the contracts locally.
 */
async function main() {
  await run("compile");

  run("node");

  // wait for the node to start
  await new Promise((resolve) => setTimeout(resolve, 2000));

  hardhatArguments.network = "localhost";

  // deploy contracts on hardhat node
  await run("run", {
    script: "./scripts/deploy.ts",
  });

  console.log("\n===================================");
  console.log("== Hardhat 👷 node started ✅ 🎉 ==");
  console.log("===================================\n");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
