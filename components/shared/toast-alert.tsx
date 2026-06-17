import { toast } from "@/components/ui/toast";

type ToastAlertOptions = {
  title: string;
  description?: string;
};

export const ToastAlert = {
  success: ({ title, description }: ToastAlertOptions) =>
    toast.success(title, { description }),
  info: ({ title, description }: ToastAlertOptions) =>
    toast.info(title, { description }),
  warning: ({ title, description }: ToastAlertOptions) =>
    toast.warning(title, { description }),
  error: ({ title, description }: ToastAlertOptions) =>
    toast.error(title, { description }),
};
