import type { IronSession } from "iron-session";

import { api } from "../utils/api";

type Authenticated = {
  loading: boolean;
  authenticated: true;
  user: NonNullable<IronSession["user"]>;
};

type Unauthenticated = {
  loading: boolean;
  authenticated: false;
};

type Session = Authenticated | Unauthenticated;

export function useSession(): Session {
  const { data: session, isLoading: loading } = api.auth.getSession.useQuery(
    undefined,
    { cacheTime: 1000, retryDelay: 1000 },
  );

  if (session?.user) {
    return {
      authenticated: true,
      loading,
      user: session.user,
    };
  }

  return { authenticated: false, loading };
}
