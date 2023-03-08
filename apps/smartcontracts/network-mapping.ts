import { U } from "ts-toolbelt";

const networkMapping = {
  hardhat: {
    MrCrypto: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    Lock: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
  goerli: {
    MrCrypto: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    Lock: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
} as const;

type Network = keyof typeof networkMapping;
// const networkList = ["hardhat", "goerli"] as const;

type NetworkList = U.ListOf<Network>;
const networkList = Object.keys(
  networkMapping,
) as unknown as Readonly<NetworkList>;

export { networkList, networkMapping, Network };
