import { ethers } from "ethers";

import { env } from "../env.mjs";

const providers = {
  hardhat: new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/", {
    chainId: 1337,
    name: "localhost",
  }),
  goerli: new ethers.providers.JsonRpcProvider(env.GOERLI_ALCHEMY_KEY_URL, {
    chainId: 5,
    name: "goerli",
  }),
  polygon: new ethers.providers.JsonRpcProvider(env.POLYGON_ALCHEMY_KEY_URL, {
    chainId: 137,
    name: "polygon",
  }),
};

const provider = providers[env.NEXT_PUBLIC_BLOCKCHAIN_NAME];

export { provider };
