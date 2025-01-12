import { toast } from "react-toastify";

export const showToast = (message: string, type: "success" | "error") => {
  const toastId = message;

  if (toast.isActive(toastId)) {
    toast.update(toastId, {
      render: message,
      type: type,
      autoClose: 3000,
      position: 'bottom-right',
    });
  } else {
    toast(message, {
      toastId: toastId,
      type: type,
      autoClose: 3000,
      position: 'bottom-right',
    });
  }
};
