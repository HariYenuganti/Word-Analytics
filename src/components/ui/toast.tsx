import { cn } from '../../lib/utils';

export type ToastItem = {
  id: string;
  message: string;
  variant?: 'success' | 'destructive' | 'default';
};

export function ToastViewport({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'rounded-md border bg-card text-card-foreground shadow px-4 py-2 text-sm animate-in fade-in slide-in-from-bottom-2',
            t.variant === 'success' && 'border-green-500/30',
            t.variant === 'destructive' && 'border-destructive'
          )}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
