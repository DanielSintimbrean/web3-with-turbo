import { HardhatUserConfig, extendEnvironment } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: [3000, 6000],
      },
    },
  },
};

extendEnvironment(async (hre) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setNetworkMapping } = require("./utils/network-map-helper.ts");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { networkMapping } = require("./network-mapping/index.ts");

  hre.setNetworkMapping = setNetworkMapping;
  hre.networkMapping = networkMapping;
});

export default config;
