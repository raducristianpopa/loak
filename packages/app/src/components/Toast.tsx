import { CheckCircle } from "@/icons/CheckCircle";
import { cx } from "class-variance-authority";

type ToastProps = {
  message: string;
};

export const SuccessToast = ({ message }: ToastProps) => (
  <div
    className={cx(
      "mb-2 flex h-auto items-center space-x-2 rounded-md bg-white p-3 text-sm font-semibold text-black shadow-md md:max-w-sm",
    )}
  >
    <span>
      <CheckCircle className="h-4 w-4 text-green-400" />
    </span>
    <p>{message}</p>
  </div>
);
