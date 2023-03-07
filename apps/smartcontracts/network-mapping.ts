import { U } from "ts-toolbelt";

export const networkMapping = {
  hardhat: {
    MrCrypto: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    Lock: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
  goerli: {
    MrCrypto: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    Lock: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
} as const;

export type Network = keyof typeof networkMapping;

type NetworkList = U.ListOf<Network>;
export const networkList = Object.keys(
  networkMapping,
) as unknown as Readonly<NetworkList>;
