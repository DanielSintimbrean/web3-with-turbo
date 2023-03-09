import { U } from "ts-toolbelt";

import { networkMapping } from "./values";

const blockchain = process.env
  .NEXT_PUBLIC_BLOCKCHAIN_NAME as keyof typeof networkMapping;

const LockAddr = networkMapping[blockchain].Lock;
const MrCryptoAddr = networkMapping[blockchain].MrCrypto;

export { LockAddr, MrCryptoAddr };

type Network = keyof typeof networkMapping;

type NetworkList = U.ListOf<Network>;
const networkList = Object.keys(
  networkMapping,
) as unknown as Readonly<NetworkList>;

export { networkList, networkMapping };
export type { Network };
