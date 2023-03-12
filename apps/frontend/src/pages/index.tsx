import type { NextPage } from "next";
import clsx from "clsx";
import { toast } from "react-toastify";
import {
  useBlockNumber,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
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

  const { write: withdraw, data: tx } = useContractWrite({
    ...config,
    onSuccess: () => {
      toast.info("Withdraw transaction sent");
    },
  });

  const { status } = useWaitForTransaction({
    hash: tx?.hash,
    confirmations: 3,
    onSuccess: () => {
      toast.success("Withdraw transaction confirmed");
    },
    onError: (err) => {
      toast.error("Error confirming withdraw transaction");
      console.log({ err });
    },
  });

  const isMounted = useIsMounted();

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center gap-4 text-white">
        {isMounted && (
          <button
            className={clsx(
              "font-xl btn-secondary btn rounded p-2 font-bold capitalize ring ring-secondary ring-offset-base-100",
              status === "loading" && "loading",
            )}
            disabled={withdraw == undefined || status === "loading"}
            onClick={() => {
              withdraw?.();
            }}
          >
            Withdraw {blocknumber}
          </button>
        )}
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{helloQuery.data}</h1>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
