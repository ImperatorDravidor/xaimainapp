// This is a compatibility layer for the toast system
// It maps to sonner's toast which is already installed

import { toast as sonnerToast } from "sonner";

export const toast = (options: {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}) => {
  const message = options.title || "";
  const description = options.description;
  
  if (options.variant === "destructive") {
    sonnerToast.error(message, { description });
  } else {
    sonnerToast.success(message, { description });
  }
};

export const useToast = () => {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  };
};
