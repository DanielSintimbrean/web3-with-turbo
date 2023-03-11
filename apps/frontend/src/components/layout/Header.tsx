import Link from "next/link";
import { useAccount } from "wagmi";

import { useAuth } from "~/hooks/useAuth";
import { useSession } from "~/hooks/useSession";
import { ConnectButton } from "../web3/ConnectButton";

export default function Header() {
  const session = useSession();
  const authenticated = session.authenticated;
  const { isDisconnected, address } = useAccount();
  const { logout, isLoggingOut } = useAuth();

  // Need to use isLoggingOut to avoid to much re-renders when logging out.
  if (
    authenticated &&
    !isLoggingOut &&
    (isDisconnected || session.user.address !== address)
  ) {
    logout().catch((error) => console.error(error));
  }

  return (
    <header className="mx-5 flex h-14 w-full max-w-7xl flex-row items-center justify-between rounded-b-xl bg-gradient-to-br from-purple-600 to-purple-700 text-red-50">
      <div className="m-5">
        <ConnectButton type="onlyConnect" />
      </div>
      <nav className="">
        <ul className="m-5 flex flex-row gap-5">
          <li className="">
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
