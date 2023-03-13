import { Dialog } from "@headlessui/react";

import { useSession } from "~/hooks/useSession";
import Modal from "./Modal";

export default function ProfileModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  function closeModal() {
    setIsOpen(false);
  }

  const session = useSession();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-base-content"
      >
        Your Profile
      </Dialog.Title>
      {session.authenticated && (
        <div>
          <p className="text-base-content">Name: {session.user.name}</p>
          <p className="text-base-content">Address: {session.user.address}</p>
        </div>
      )}
      <div className="mt-4">
        <button
          type="button"
          className="btn-outline btn-primary btn-sm btn"
          onClick={closeModal}
        >
          Got it, thanks!
        </button>
      </div>
    </Modal>
  );
}
