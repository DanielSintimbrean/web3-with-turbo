import Link from "next/link";
import { useAccount } from "wagmi";

import { useAuth } from "~/hooks/useAuth";
import { useSession } from "~/hooks/useSession";
import NavDropdown from "../NavDropdown";
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
    <header className="flex h-20 w-full max-w-5xl flex-row items-center justify-between rounded-b-xl border-2 border-t-0 border-base-content bg-gradient-to-br from-base-100 to-neutral text-red-50">
      <div className="mx-8">
        <ConnectButton type="onlyConnect" />
      </div>
      <nav className="">
        <ul className="m-5 flex flex-row gap-2">
          <li className="flex items-center justify-center">
            <Link href="/">Home</Link>
          </li>
          <li>
            <NavDropdown></NavDropdown>
          </li>
        </ul>
      </nav>
    </header>
  );
}
