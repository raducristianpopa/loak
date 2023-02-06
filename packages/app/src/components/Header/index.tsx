import { Popover, Transition } from "@headlessui/react";
import { Bars } from "@/icons/Bars";
import { XMarkIcon } from "@/icons/XMarkIcon";
import { cx } from "class-variance-authority";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { Link } from "@/ui/Link";
import { IconOnlyLogo } from "@/ui/Logo";
import { MobileNavigation } from "./MobileNavigation";
import { Profile } from "./Profile";

export interface TabProps {
  name: string;
  href: string;
}

const tabs: TabProps[] = [
  { name: "Links", href: "/" },
  { name: "Settings", href: "/settings" },
];

const Header = () => {
  const { pathname } = useRouter();

  return (
    <Popover as="header" className="bg-black pb-24">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-3xl py-5 px-4 sm:px-6 md:max-w-7xl md:py-0">
            <div className="relative flex items-center justify-center py-5 md:justify-between">
              {/* Logo */}
              <div className="absolute left-0 flex-shrink-0 font-rubik text-4xl md:static">
                <Link href="/">
                  <span className="sr-only">Loak Click</span>
                  <IconOnlyLogo className="h-8 w-8" />
                </Link>
              </div>

              {/* Right section on desktop */}
              <div className="hidden md:ml-auto md:flex md:items-center md:pr-0.5">
                <Profile />
              </div>

              {/* Menu button */}
              <div className="absolute right-0 flex-shrink-0 md:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-accent-3 hover:bg-accent-3 hover:text-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
            <div className="hidden py-5 md:block">
              <div className="flex  items-center gap-8">
                <nav className="flex space-x-4">
                  {tabs.map((tab) => (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      className={cx(
                        tab.href === pathname
                          ? "text-white"
                          : "text-accent-5 hover:text-white",
                        "rounded-md px-3 py-2 font-medium transition-colors duration-150 hover:bg-accent-3",
                      )}
                      aria-current={
                        tab.href === `${pathname}` ? "page" : undefined
                      }
                    >
                      {tab.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <Transition.Root as={Fragment}>
            <div className="md:hidden">
              {/* Backdrop */}
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-10" />
              </Transition.Child>
              <MobileNavigation tabs={tabs} />
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
};

export default Header;
