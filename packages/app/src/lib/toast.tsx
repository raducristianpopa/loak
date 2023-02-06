import reactHotToast from "react-hot-toast";
import { SuccessToast } from "@/components/Toast";

const TOAST_VISIBLE_DURATION = 6000;

export const toast = (
  message: string,
  variant: "success",
  duration = TOAST_VISIBLE_DURATION,
) => {
  console.log("test");
  switch (variant) {
    case "success":
      reactHotToast.custom((_t) => <SuccessToast message={message} />, {
        duration,
      });
      break;
  }
};
