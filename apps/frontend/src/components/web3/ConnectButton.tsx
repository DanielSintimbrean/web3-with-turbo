import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";

import { useAuth } from "~/hooks/useAuth";
import { useIsMounted } from "~/hooks/useIsMounted";
import { useSession } from "~/hooks/useSession";

function SignInButton() {
  const { getNonce, verifySignature, isLoggingIn } = useAuth();
  const { authenticated } = useSession();

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const signIn = async () => {
    try {
      const chainId = chain?.id;
      if (!address || !chainId) return;

      const { data: nonceData } = await getNonce();

      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: nonceData?.nonce,
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const verifyRes = await verifySignature({ message, signature });

      if (!verifyRes.ok) throw new Error("Error verifying message");
    } catch (error) {}
  };

  return (
    <button
      className="text-white"
      disabled={authenticated || isLoggingIn}
      onClick={() => {
        signIn().catch((err) => {
          console.log(err);
        });
      }}
    >
      Sign-IN as{" "}
      {(address?.slice(0, 6).toString() ?? "") +
        "..." +
        (address?.slice(-5, -1).toString() ?? "")}
    </button>
  );
}

export function ConnectButton({
  type,
}: {
  type: "onlyConnect" | "connectAndSingIn";
}) {
  const { logout } = useAuth();
  const { isConnected, address } = useAccount();
  const isMounted = useIsMounted();
  const session = useSession();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  // Need to use isMounted because of Hydration Errors
  if (!isMounted) return <div></div>;

  if (isConnected && type === "connectAndSingIn") {
    return (
      <div>
        {/* Account content goes here */}
        {session.authenticated ? (
          <div>
            <div className="font-bold">
              Signed in as{" "}
              {session.user.address.slice(0, 6) +
                "..." +
                session.user.address.slice(-5, -1)}
            </div>
            <button
              className="btn-sm btn"
              onClick={() => {
                logout().catch((err) => {
                  console.log(err);
                });
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <SignInButton />
          </div>
        )}
      </div>
    );
  }

  if (isConnected && type === "onlyConnect")
    return (
      <div>
        {address && (
          <div className=" text-xl font-bold">
            {address.slice(0, 6) + "..." + address.slice(-5, -1)}
          </div>
        )}
      </div>
    );

  return (
    <div>
      {connectors.map((connector) => (
        <button
          className="btn-primary btn-sm btn text-lg"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          Connect with {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}
