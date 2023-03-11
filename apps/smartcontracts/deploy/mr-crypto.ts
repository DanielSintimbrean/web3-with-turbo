import { ethers, network, setNetworkMapping } from "hardhat";

export async function deployMrCrypto() {
  const MrCryptoNFT_Factory = await ethers.getContractFactory("MrCrypto");

  const args: Parameters<typeof MrCryptoNFT_Factory.deploy> = [
    "Mr. Crypto",
    "MRC",
    "https://apinft.racksmafia.com/api/",
    "https://apinft.racksmafia.com/api/hidden.json",
  ];

  const MrCryptoNFT = await MrCryptoNFT_Factory.deploy(...args);

  await MrCryptoNFT.deployed();

  setNetworkMapping({
    network: network.name,
    contract: "MrCrypto",
    address: MrCryptoNFT.address as `0x${string}}`,
  });

  console.log(
    `\n MrCrypto ==> deployed to ${MrCryptoNFT.address} on ${network.name}\n`,
  );

  return { MrCryptoNFT };
}
