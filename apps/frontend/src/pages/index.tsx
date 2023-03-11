import type { NextPage } from "next";
import clsx from "clsx";
import {
  useBlockNumber,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { LockAddr } from "@turbo-web3/smartcontracts/network-mapping";
import { Lock__factory } from "@turbo-web3/smartcontracts/typechain-types";

import { api } from "~/utils/api";
import AppLayout from "~/components/layout/AppLayout";
import { useIsMounted } from "~/hooks/useIsMounted";

const lockAbi = Lock__factory.abi;

const Home: NextPage = () => {
  const helloQuery = api.hello.useQuery();

  const { config } = usePrepareContractWrite({
    abi: lockAbi,
    address: LockAddr,
    functionName: "withdraw",
  });
  const { data: blocknumber } = useBlockNumber({
    staleTime: 1000,
    enabled: true,
    cacheTime: 1000,
    watch: true,
  });
  const { write: withdraw } = useContractWrite(config);

  const isMounted = useIsMounted();

  return (
    <AppLayout>
      <div className="flex  flex-col items-center justify-center gap-4 text-white">
        {isMounted && (
          <button
            className={clsx(
              "rounded  p-2 font-bold",
              withdraw != undefined ? "bg-pink-400" : "bg-slate-400",
            )}
            onClick={() => {
              withdraw?.();
            }}
          >
            Withdraw {blocknumber}
          </button>
        )}
        <span>{helloQuery.data}</span>
      </div>
    </AppLayout>
  );
};

export default Home;
