import { U } from "ts-toolbelt";

import { networkMapping } from "./values";

type Network = keyof typeof networkMapping;

type NetworkList = U.ListOf<Network>;
const networkList = Object.keys(
  networkMapping,
) as unknown as Readonly<NetworkList>;

export { networkList, networkMapping };
export type { Network };
