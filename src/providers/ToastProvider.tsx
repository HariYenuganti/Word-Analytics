import { useCallback, useMemo, useState } from 'react';
import { ToastViewport, type ToastItem } from '../components/ui/toast';
import { ToastContext, type ToastOptions } from './toastContext';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, opts: ToastOptions = {}) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, variant: opts.variant }]);
    const duration = typeof opts.duration === 'number' ? opts.duration : 2000;
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} />
    </ToastContext.Provider>
  );
}
