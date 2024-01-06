import { toast } from "react-toastify";

export const displaySuccessToast = (message: string) => {
  console.log("calling displaySuccessToast", message);
  toast.success(message, { theme: "colored" });
};

export const displayErrorToast = (message: string) => {
  toast.error(message, { theme: "colored" });
};
