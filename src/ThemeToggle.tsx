import { Sun, Moon } from 'lucide-react';
import { Button } from './components/ui/button';

export default function ThemeToggle() {
  const toggle = () => {
    const el = document.documentElement;
    el.classList.toggle('dark');
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      className="shrink-0"
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="h-4 w-4 hidden dark:block" />
    </Button>
  );
}
