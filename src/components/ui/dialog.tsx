import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children?: ReactNode;
};

export function Dialog({
  open,
  onOpenChange,
  title = 'About',
  children,
}: DialogProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-40 flex items-center justify-center p-4',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          'absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          'relative z-10 w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-lg p-6 space-y-4 transition-all',
          open ? 'animate-in fade-in zoom-in-95' : 'opacity-0 scale-95'
        )}
      >
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <div className="text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="inline-flex items-center rounded-md bg-secondary text-secondary-foreground h-8 px-3 text-sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
