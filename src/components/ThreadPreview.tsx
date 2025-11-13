import { memo } from 'react';
import { splitIntoTwitterSegments } from '../lib/twitterThread';
import { Button } from './ui/button';
import { useToast } from '../hooks/useToast';

function ThreadPreview({ text }: { text: string }) {
  const { toast } = useToast();
  const segments = splitIntoTwitterSegments(text);
  if (segments.length <= 1) return null;
  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(segments.join('\n\n'));
      toast('Thread copied', { variant: 'success' });
    } catch {
      toast('Copy failed', { variant: 'destructive' });
    }
  };
  return (
    <div className="mt-3 border rounded-md p-3 bg-muted/50 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-wide">
          Twitter Thread Preview
        </h3>
        <Button size="sm" variant="outline" onClick={copyAll}>
          Copy All
        </Button>
      </div>
      <ol className="list-decimal list-inside space-y-1 text-xs max-h-40 overflow-auto">
        {segments.map((seg) => (
          <li key={seg} className="leading-snug">
            {seg}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default memo(ThreadPreview);
