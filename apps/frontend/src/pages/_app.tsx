import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import { WagmiProvider } from "~/providers/WagmiProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <WagmiProvider>
        <Component {...pageProps} />
      </WagmiProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
