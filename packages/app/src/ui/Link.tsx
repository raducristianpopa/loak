import { forwardRef } from "react";

import ButtonOrLink, { ButtonOrLinkProps } from "./ButtonOrLink";

type LinkProps = ButtonOrLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props, ref: any) => {
    return <ButtonOrLink {...props} ref={ref} />;
  },
);

Link.displayName = "Link";
