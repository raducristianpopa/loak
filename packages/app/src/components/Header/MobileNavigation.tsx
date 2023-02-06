import { Popover, Transition } from "@headlessui/react";
import { XMarkIcon } from "@/icons/XMarkIcon";
import { ArrowLeftOnRectangleIcon } from "@/icons/ArrowLeftOnRectangleIcon";
import { cx } from "class-variance-authority";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { type TabProps } from "@/components/Header";
import { Link } from "@/ui/Link";
import { useAuth } from "@clerk/nextjs";

interface MobileNavigationProps {
  tabs: TabProps[];
}

export const MobileNavigation = ({ tabs }: MobileNavigationProps) => {
  const { pathname, push } = useRouter();
  const { signOut } = useAuth();

  return (
    <Transition.Child
      as={Fragment}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-150 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
      >
        <div className="divide-y divide-accent-3 rounded-lg border border-accent-3 bg-black">
          <div className="pt-3 pb-2">
            <div className="flex items-center justify-between px-4">
              LOGO
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-accent-5 hover:bg-accent-3 hover:text-white focus:outline-none">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={cx(
                    tab.href === pathname
                      ? "text-white"
                      : "text-accent-5 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium hover:bg-accent-3",
                  )}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-4 pb-2">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-white" />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <div className="truncate text-base font-medium text-white">
                  Username{" "}
                </div>
                <div className="truncate text-sm font-medium text-accent-8">
                  Email
                </div>
              </div>
              <button
                type="button"
                className="ml-auto flex rounded-md p-2 text-accent-5 hover:bg-accent-3 hover:text-white focus:outline-none"
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
              </button>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition.Child>
  );
};
