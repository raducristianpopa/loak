import { SVGProps } from "react";

export const IconOnlyLogo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="1000"
      height="1000"
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M500 1000C776.156 1000 1000 776.156 1000 500C1000 223.844 776.156 0 500 0C223.844 0 0 223.844 0 500C0 776.156 223.844 1000 500 1000ZM463.031 200.656H525.531V478.344H803.25V540.844H463.031V200.656ZM276.812 214.312H339.312V660.656H785.656V723.156H276.812V214.312Z"
        fill="currentColor"
      />
    </svg>
  );
};
