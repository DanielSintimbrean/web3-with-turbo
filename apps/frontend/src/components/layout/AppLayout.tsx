import type { ReactNode } from "react";
import Head from "next/head";

import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className=" flex h-full min-h-screen w-full min-w-full flex-col items-center bg-[#2e026d]">
      <Head>
        <title>Web 3 with Turbo</title>
        <meta name="description" content="Make web3 faster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
