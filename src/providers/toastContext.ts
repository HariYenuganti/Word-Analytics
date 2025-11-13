import { createContext } from 'react';

export type ToastOptions = {
  variant?: 'success' | 'destructive' | 'default';
  duration?: number;
};
export type ToastContextValue = {
  toast: (message: string, opts?: ToastOptions) => void;
};

export const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});
