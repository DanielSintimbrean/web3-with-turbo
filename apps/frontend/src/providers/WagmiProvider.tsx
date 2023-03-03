import {
  WagmiConfig,
  configureChains,
  createClient,
  goerli,
  mainnet,
} from "wagmi";
import { localhost, polygon } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

const chain: "hardhat" | "goerli" | "polygon" = "hardhat";
const _chains = {
  hardhat: localhost,
  goerli: goerli,
  polygon: polygon,
  mainnet: mainnet,
};

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [_chains[chain]],
  [publicProvider()],
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
