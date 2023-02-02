import { ExclamationCircleIcon } from "@/icons/ExclamationCircleIcon";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef, useId } from "react";
import { cx } from "class-variance-authority";
import { Label } from "./Label";

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "className"> & {
  label: string;
  error?: string;
  addOn?: ReactNode;
  fullWidth?: boolean;
  tip?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, error, addOn, fullWidth, ...props }, ref) => {
    const id = useId();

    return (
      <div className={cx(fullWidth ? "w-full" : "")}>
        {label && <Label htmlFor={id}>{label}</Label>}
        <div
          className={cx(
            addOn ? "flex" : "",
            "relative mt-1 rounded-md shadow-sm",
          )}
        >
          {addOn && (
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-accent-4 bg-accent-1 px-3 text-accent-6">
              {addOn}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            type={type ?? "text"}
            className={cx(
              addOn ? "min-w-0 flex-1 rounded-r-md" : "rounded-md",
              error
                ? "border-red-500 focus:border-red-500"
                : "border-accent-4 focus:border-accent-9",
              "block w-full bg-transparent pr-10 placeholder:font-light placeholder:text-accent-4 focus:outline-none focus:ring-0",
            )}
            {...props}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
