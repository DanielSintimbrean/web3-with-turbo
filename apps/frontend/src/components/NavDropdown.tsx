import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiLibrary } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";

import { useSession } from "~/hooks/useSession";
import ProfileModal from "./ProfileModal";
import TechnologiesModal from "./TechnologiesModal";

export default function NavDropdown() {
  const [isTechnologiesModalOpen, setIsTechnologiesModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const session = useSession();

  return (
    <div className="top-16  text-right">
      <Menu as="div" className="relative z-10 inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-2 rounded-md bg-transparent bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Options <BsChevronDown />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-base-100 bg-opacity-50 shadow-lg ring-2 ring-base-content ring-opacity-5 backdrop-blur-sm focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setIsTechnologiesModalOpen(true)}
                    className={`${
                      active ? "bg-primary text-white" : "text-base-content"
                    } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                  >
                    <BiLibrary />
                    Libraries y Technologies
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    disabled={!session.authenticated || session.loading}
                    className={`${
                      active ? "bg-primary text-white" : "text-base-content"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-base-content"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Archive
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-base-content"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Move
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-base-content"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <TechnologiesModal
        isOpen={isTechnologiesModalOpen}
        setIsOpen={setIsTechnologiesModalOpen}
      />
      <ProfileModal
        isOpen={isProfileModalOpen}
        setIsOpen={setIsProfileModalOpen}
      />
    </div>
  );
}
