import type { ComponentPropsWithoutRef, ReactNode } from "react";

type LabelProps = Omit<
  ComponentPropsWithoutRef<"label">,
  "className" | "children"
> & {
  children: ReactNode;
};

export const Label = ({ htmlFor, children, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-medium text-accent-10"
      {...props}
    >
      {children}
    </label>
  );
};
