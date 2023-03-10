import { ethers, network, setNetworkMapping } from "hardhat";

export async function deployLock() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 1200;

  const lockedAmount = ethers.utils.parseEther("0001");

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  setNetworkMapping({
    contract: "Lock",
    address: lock.address as `0x${string}`,
    network: network.name,
  });

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount,
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`,
  );
}
