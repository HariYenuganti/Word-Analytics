import * as React from 'react';
import { cn } from '../../lib/utils';

type Variant = 'secondary' | 'outline' | 'success' | 'destructive';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'secondary', ...props }, ref) => {
    const variants: Record<Variant, string> = {
      secondary: 'bg-secondary text-secondary-foreground',
      outline: 'border border-border text-foreground',
      success: 'bg-green-500/15 text-green-600 dark:text-green-400',
      destructive: 'bg-destructive/15 text-destructive',
    };
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
