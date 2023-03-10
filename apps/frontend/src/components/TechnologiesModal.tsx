import { Dialog } from "@headlessui/react";

import Modal from "./Modal";

export default function TechnologiesModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-base-content"
      >
        Libraries y Technologies ⚛️
      </Dialog.Title>
      <div className="my-8">
        <p className="text-md mb-2 font-black text-gray-300">
          Libraries and technologies used in this project:
        </p>
        <p className="text-md text-gray-300">
          Turborepo, Next.js, TailwindCSS, React, TypeScript, tRPC, Hardhat,
          Wagmi, Siwe, Zod, React Icons, TsUp, Prisma, Ethers.js, HeadlessUI,
          IronSession, DaisyUI... and more!
        </p>
      </div>

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
