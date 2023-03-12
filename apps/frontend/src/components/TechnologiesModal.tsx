import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
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
                    Turborepo, Next.js, TailwindCSS, React, TypeScript, tRPC,
                    Hardhat, Wagmi, Siwe, Zod, React Icons, TsUp, Prisma,
                    Ethers.js, HeadlessUI, IronSession, DaisyUI... and more!
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
