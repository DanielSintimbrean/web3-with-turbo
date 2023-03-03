import type { ReactNode } from "react";
import Head from "next/head";

import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#2e026d]">
      <Head>
        <title>Web 3 with Turbo</title>
        <meta name="description" content="Make web3 faster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
    </div>
  );
}
