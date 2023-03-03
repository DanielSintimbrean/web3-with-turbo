import { api } from "~/utils/api";

export const useAuth = () => {
  const apiContext = api.useContext();
  const { mutateAsync: verifySignature, isLoading: isLoggingIn } =
    api.auth.verify.useMutation({
      onSuccess: () => {
        // Refresh session
        apiContext.auth.invalidate().catch((err) => {
          console.error(err);
        });
      },
    });

  const { refetch: getNonce } = api.auth.nonce.useQuery(undefined, {
    // Only fetch with refresh function called manually
    enabled: false,
  });

  const { mutateAsync: logout, isLoading: isLoggingOut } =
    api.auth.logout.useMutation({
      onSuccess: () => {
        // Refresh session
        apiContext.auth.invalidate().catch((err) => {
          console.error(err);
        });
      },
    });

  return {
    verifySignature: verifySignature,
    getNonce,
    logout,
    isLoggingOut,
    isLoggingIn,
  };
};
