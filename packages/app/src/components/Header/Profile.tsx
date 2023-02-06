import { useAuth } from "@clerk/nextjs";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@/icons/UserCircleIcon";
import { ArrowLeftOnRectangleIcon } from "@/icons/ArrowLeftOnRectangleIcon";
import { useRouter } from "next/router";
import { Fragment } from "react";

export const Profile = () => {
  const { push } = useRouter();
  const { signOut } = useAuth();

  return (
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        <Menu.Button className="ring-whit rounded-full focus:outline-none">
          <span className="sr-only">Open user menu</span>
          <UserCircleIcon className="w-w h-8 text-accent-5 transition-colors duration-150 hover:text-white" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md border border-accent-3 bg-black py-1 shadow-lg focus:outline-none">
          <Menu.Item
            as="button"
            className="flex w-full items-center px-4 py-2 text-accent-5 hover:bg-accent-3 hover:text-white focus:outline-none"
            onClick={() => {
              signOut();
              push("/sign-in");
            }}
          >
            <ArrowLeftOnRectangleIcon
              className="mr-2 h-6 w-6"
              aria-hidden="true"
            />
            <span>Log out</span>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
