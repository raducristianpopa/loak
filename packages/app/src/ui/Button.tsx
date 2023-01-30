import { forwardRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import ButtonOrLink, { type ButtonOrLinkProps } from "./ButtonOrLink";

const buttonStyles = cva("inline-flex items-center justify-center", {
  variants: {
    intent: {
      primary: [
        "border",
        // Light theme
        "bg-black text-white border-black hover:bg-white hover:text-black",
        // Dark theme
        "dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white",
      ],
      danger: [
        "border bg-red-600 text-white border-red-600 hover:bg-transparent hover:text-red-600",
      ],
    },
    size: {
      md: "px-3 py-2 rounded-md font-medium",
      lg: "px-4 py-3 rounded-lg text-lg font-semibold",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});

export interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    ButtonOrLinkProps {
  ["aria-label"]: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ intent, size, children, ...props }, ref) => {
    return (
      <ButtonOrLink
        ref={ref}
        className={buttonStyles({ intent, size })}
        {...props}
      >
        {children}
      </ButtonOrLink>
    );
  },
);

Button.displayName = "Button";
