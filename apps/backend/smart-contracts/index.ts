import { LockAddr } from "@turbo-web3/smartcontracts/network-mapping";
import { Lock__factory } from "@turbo-web3/smartcontracts/typechain-types";

import { provider } from "./provider";

export const lock = Lock__factory.connect(LockAddr, provider);
