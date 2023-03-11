import type { ReactNode } from "react";
import Head from "next/head";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full min-h-screen w-full min-w-full flex-col items-center bg-base-200">
      <Head>
        <title>Web 3 with Turbo</title>
        <meta name="description" content="Make web3 faster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative min-h-[calc(100vh_-_3.5rem)] w-full overflow-hidden [&>*]:absolute [&>*]:h-full [&>*]:w-full">
        {children}
      </main>
      <hr className="mx-auto my-4 h-1 w-5/6 rounded border-0 bg-gray-100 md:my-10" />
      <Footer />
    </div>
  );
}
