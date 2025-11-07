import { useState, useEffect, useCallback, useRef } from 'react';
import { Textarea as UITextarea } from './components/ui/textarea';
import { Button } from './components/ui/button';
import { Copy, Info } from 'lucide-react';
import { Dialog } from './components/ui/dialog.jsx';
import { Separator } from './components/ui/separator';
import Warning from './Warning';
import { effectiveLengthForPlatform } from './lib/stats';
import { useToast } from './hooks/useToast';
import { PLATFORMS } from './config/platforms';

export default function Textarea({
  text,
  setText,
  length,
  limits,
  platform,
  setPlatform,
}) {
  // Fallback if not provided via props
  const [internalPlatform, setInternalPlatform] = useState('instagram');
  const activePlatform = platform ?? internalPlatform;
  const setActivePlatform = setPlatform ?? setInternalPlatform;
  const [legendOpen, setLegendOpen] = useState(false);
  const [warningText, setWarningText] = useState('');

  const handleChange = (e) => {
    const newText = e.target.value;
    const issues = [];
    if (newText.includes('<script>')) {
      issues.push('Contains <script> tag.');
    }
    if (/https?:\/\/\S{200,}/.test(newText)) {
      issues.push('Very long URL detected; consider shortening.');
    }
    if ((newText.match(/@/g) || []).length > 5) {
      issues.push('High mention density (>5).');
    }
    setWarningText(issues.join(' '));
    setText(newText);
  };

  const clearText = useCallback(() => setText(''), [setText]);
  const { toast } = useToast();
  const copyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast('Copied to clipboard', { variant: 'success' });
    } catch (err) {
      toast('Copy failed', { variant: 'destructive' });
    }
  }, [text, toast]);
  const clearWithToast = useCallback(() => {
    clearText();
    toast('Cleared text', { variant: 'success' });
  }, [clearText, toast]);

  const currentLimit = limits[activePlatform];
  const effectiveLen = effectiveLengthForPlatform(text, activePlatform);
  const progress = Math.min(100, (effectiveLen / currentLimit) * 100);
    const platformConfig = PLATFORMS[activePlatform];
    const progressColor = platformConfig?.progressBg || 'bg-primary';
    const platformTips = {
      instagram: PLATFORMS.instagram.tips,
      facebook: PLATFORMS.facebook.tips,
      twitter: PLATFORMS.twitter.tips,
    };
  const hashtagCount = (text.match(/(^|\s)#\w+/g) || []).length;
    const hashtagGuide = {
      instagram: PLATFORMS.instagram.hashtag.guide,
      facebook: PLATFORMS.facebook.hashtag.guide,
      twitter: PLATFORMS.twitter.hashtag.guide,
    };
    const hashtagRanges = {
      instagram: PLATFORMS.instagram.hashtag.range,
      facebook: PLATFORMS.facebook.hashtag.range,
      twitter: PLATFORMS.twitter.hashtag.range,
    };
  const [minH, maxH] = hashtagRanges[activePlatform] || [0, 0];
  const hashStatus =
    hashtagCount < minH ? 'low' : hashtagCount > maxH ? 'high' : 'ok';
  const hashColor =
    hashStatus === 'ok'
      ? 'text-emerald-600'
      : hashStatus === 'low'
      ? 'text-amber-600'
      : 'text-destructive';
  // Refs for mobile FAB long-press
  const pressTimerRef = useRef(null);
  const longPressFiredRef = useRef(false);
  const handleFabPointerDown = () => {
    longPressFiredRef.current = false;
    pressTimerRef.current = setTimeout(() => {
      longPressFiredRef.current = true;
      clearWithToast();
    }, 600);
  };
  const cancelFabTimer = () => {
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
  };
  const handleFabPointerUp = () => {
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    if (!longPressFiredRef.current) copyText();
    longPressFiredRef.current = false;
  };

  // Keyboard shortcuts
  // Ctrl/Cmd+K: Clear, Ctrl/Cmd+C: Copy
  useEffect(() => {
    const listener = (e) => {
      const meta = e.metaKey || e.ctrlKey;
      if (!meta) return;
      if (e.key.toLowerCase() === 'k') {
        e.preventDefault();
        clearText();
      } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        copyText();
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [text, clearText, copyText]);

  // Toggle a global class on focus/blur to compact the hero when keyboard is open
  const onFocusTextarea = () => {
    try {
      document.documentElement.classList.add('kb-open');
    } catch (e) {
      /* ignore */
    }
  };
  const onBlurTextarea = () => {
    try {
      document.documentElement.classList.remove('kb-open');
    } catch (e) {
      /* ignore */
    }
  };

  return (
    <div className="relative flex flex-col w-full md:flex-[2] flex-1 min-w-0">
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-sm sm:text-base font-medium text-muted-foreground">
            Your Text
          </h2>
          <span className="text-xs sm:text-sm text-muted-foreground/70">
            {length} chars •{' '}
            {text.trim() === '' ? 0 : text.trim().split(/\s+/).length} words
          </span>
        </div>
        {/* Mobile platform switcher */}
        <div
          className="flex gap-1 sm:hidden mt-1 items-center"
          role="tablist"
          aria-label="Choose platform limits"
        >
          {Object.keys(limits).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={activePlatform === key}
              onClick={() => setActivePlatform(key)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activePlatform === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setLegendOpen(true)}
            className="ml-1 text-xs px-2 py-1 rounded bg-white/60 dark:bg-neutral-800/60 border border-black/10 dark:border-white/10"
          >
            Legend
          </button>
        </div>
        {/* Desktop platform switcher */}
        <div
          className="hidden sm:flex gap-2 mt-1 items-center"
          role="tablist"
          aria-label="Choose platform limits"
        >
          {Object.keys(limits).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={activePlatform === key}
              onClick={() => setActivePlatform(key)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
                activePlatform === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setLegendOpen(true)}
            className="ml-1 text-xs sm:text-[13px] px-2 py-1.5 rounded bg-white/60 dark:bg-neutral-800/60 border border-black/10 dark:border-white/10 hover:bg-white/70 dark:hover:bg-neutral-800/70"
          >
            Legend
          </button>
          <span className="sr-only">Current platform: {activePlatform}</span>
        </div>
        {/* Platform best-practice tip */}
        <div className="sm:hidden flex items-start gap-2 text-xs text-muted-foreground/80 mt-1">
          <Info className="h-3.5 w-3.5 mt-[2px]" />
          <span>{platformTips[activePlatform]}</span>
        </div>
        <div
          className="sm:hidden text-[11px] text-muted-foreground/70"
          aria-live="polite"
        >
          Hashtags: <span className="font-medium">{hashtagCount}</span> •{' '}
          {hashtagGuide[activePlatform]}
          <span className={`ml-1 font-medium ${hashColor}`}>
            {hashStatus === 'ok'
              ? 'Great spot'
              : hashStatus === 'low'
              ? `Try ≥ ${minH}`
              : `Consider ≤ ${maxH}`}
          </span>
        </div>
        <UITextarea
          value={text}
          onChange={handleChange}
          placeholder="Enter your text"
          spellCheck="false"
          className="min-h-[220px] sm:min-h-[280px] md:min-h-[420px] h-full w-full max-w-full resize-none"
          aria-label="Input text for word analytics"
          onFocus={onFocusTextarea}
          onBlur={onBlurTextarea}
        />
        <div className="space-y-2 mt-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="capitalize">
                {activePlatform} ({currentLimit - effectiveLen} left)
              </span>
              <span
                className={currentLimit - effectiveLen < 0 ? 'text-destructive' : ''}
              >
                {effectiveLen}/{currentLimit}
              </span>
            </div>
            <div className="h-2 w-full rounded bg-muted overflow-hidden">
              <div
                className={`h-full transition-colors duration-300 ${
                  progress > 100 ? 'bg-destructive' : progressColor
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {/* Secondary limits preview (hidden on very small screens) */}
          <div className="hidden sm:grid grid-cols-3 gap-2 text-[11px]">
            {Object.entries(limits).map(([key, val]) => {
              const eff = effectiveLengthForPlatform(text, key);
              return (
                <div key={key} className="flex flex-col gap-0.5">
                  <span className="capitalize font-medium">{key}</span>
                  <span
                    className={`truncate ${
                      val - eff < 0
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {val - eff} left
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Separator className="hidden sm:block" />
      <div className="hidden sm:flex gap-2 px-4 py-3 bg-muted/40 backdrop-blur supports-[backdrop-filter]:bg-muted/30">
        <Button
          type="button"
          variant="secondary"
          onClick={clearText}
          disabled={!text}
        >
          Clear
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={copyText}
          disabled={!text}
        >
          Copy
        </Button>
      </div>
      {/* Floating Copy FAB on mobile (long-press to clear) */}
      <button
        type="button"
        disabled={!text}
        aria-label="Copy text (long-press to clear)"
        className="sm:hidden fixed bottom-20 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg disabled:opacity-50"
        onPointerDown={handleFabPointerDown}
        onPointerUp={handleFabPointerUp}
        onPointerLeave={cancelFabTimer}
        onPointerCancel={cancelFabTimer}
      >
        <Copy className="h-5 w-5" />
      </button>
      {/* Screen reader live region for remaining characters */}
      <div className="sr-only" aria-live="polite">
        {currentLimit - effectiveLen} characters left on {activePlatform}
      </div>
      {/* Legend dialog */}
      <Dialog open={legendOpen} onOpenChange={setLegendOpen} title="Legend">
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium text-pink-600">Instagram</span>: pink
            bar • {hashtagGuide.instagram}
          </li>
          <li>
            <span className="font-medium text-blue-600">Facebook</span>: blue
            bar • {hashtagGuide.facebook}
          </li>
          <li>
            <span className="font-medium text-sky-600">Twitter</span>: sky bar •{' '}
            {hashtagGuide.twitter}
          </li>
        </ul>
      </Dialog>
      {warningText && <Warning warningText={warningText} />}
    </div>
  );
}

// Props contract (JSDoc)
/**
 * @typedef {Object} TextareaProps
 * @property {string} text - Current text value
 * @property {(next: string) => void} setText - State setter for text
 */
