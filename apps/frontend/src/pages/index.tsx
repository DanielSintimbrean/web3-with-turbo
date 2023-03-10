import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import clsx from "clsx";
import {
  useBlockNumber,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { LockAddr } from "@turbo-web3/smartcontracts/network-mapping";
import { Lock__factory } from "@turbo-web3/smartcontracts/typechain-types";

import { api, type RouterOutputs } from "~/utils/api";
import AppLayout from "~/components/layout/AppLayout";

const lockAbi = Lock__factory.abi;

const PostCard: React.FC<{
  post: RouterOutputs["post"]["all"][number];
  onPostDelete?: () => void;
}> = ({ post, onPostDelete }) => {
  return (
    <div className="flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-pink-400">{post.title}</h2>
        <p className="mt-2 text-sm">{post.content}</p>
      </div>
      <div>
        <span
          className="cursor-pointer text-sm font-bold uppercase text-pink-400"
          onClick={onPostDelete}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

const CreatePostForm: React.FC = () => {
  const utils = api.useContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      await utils.post.all.invalidate();
    },
  });

  return (
    <div className="flex w-full max-w-2xl flex-col p-4">
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </span>
      )}
      <Link href="/yoo">Hello</Link>
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.content}
        </span>
      )}
      <button
        className="rounded bg-pink-400 p-2 font-bold"
        onClick={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        Create
      </button>
    </div>
  );
};

const Home: NextPage = () => {
  const postQuery = api.post.all.useQuery();

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

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => postQuery.refetch(),
  });

  return (
    <>
      <AppLayout>
        <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-pink-400">T3</span> Turbo
          </h1>
          <AuthShowcase />

          <CreatePostForm />

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

          {postQuery.data ? (
            <div className="w-full max-w-2xl">
              {postQuery.data?.length === 0 ? (
                <span>There are no posts!</span>
              ) : (
                <div className="flex h-[40vh] justify-center overflow-y-scroll px-4 text-2xl">
                  <div className="flex w-full flex-col gap-4">
                    {postQuery.data?.map((p) => {
                      return (
                        <PostCard
                          key={p.id}
                          post={p}
                          onPostDelete={() => deletePostMutation.mutate(p.id)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </AppLayout>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4"></div>
  );
};
