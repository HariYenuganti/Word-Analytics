import { cn } from '../../lib/utils';

// Keep only component exports in this file to satisfy fast refresh constraints.

export function ToastViewport({ toasts }) {
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
