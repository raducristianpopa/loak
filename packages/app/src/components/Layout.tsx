import { type ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="min-h-full">
        <Header />
        <div className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
