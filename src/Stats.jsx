import { memo, useMemo, useState } from 'react';
import { Separator } from './components/ui/separator';

/**
 * @param {{
 *  stats: {
 *    numberOfWords: number,
 *    numberOfCharacters: number,
 *    instagramCharactersLeft: number,
 *    facebookCharactersLeft: number,
 *  }
 * }} props
 */
function Stats({ stats, platform }) {
  const [showTips, setShowTips] = useState(false);
  const items = useMemo(
    () => [
      { key: 'words', number: stats.numberOfWords, label: 'Words' },
      {
        key: 'characters',
        number: stats.numberOfCharacters,
        label: 'Characters',
      },
      {
        key: 'instagram',
        number: stats.instagramCharactersLeft,
        label: 'Instagram',
      },
      {
        key: 'facebook',
        number: stats.facebookCharactersLeft,
        label: 'Facebook',
      },
      {
        key: 'twitter',
        number: stats.twitterCharactersLeft,
        label: 'Twitter',
      },
    ],
    [
      stats.numberOfWords,
      stats.numberOfCharacters,
      stats.instagramCharactersLeft,
      stats.facebookCharactersLeft,
      stats.twitterCharactersLeft,
    ]
  );
  const platformColor =
    platform === 'instagram'
      ? 'ring-pink-500'
      : platform === 'facebook'
      ? 'ring-blue-600'
      : platform === 'twitter'
      ? 'ring-sky-500'
      : 'ring-primary';

  return (
    <section className="md:flex-[1.3] md:min-w-[300px] bg-secondary flex flex-col md:border-l border-black/5 min-w-0 md:pl-2">
      <div className="grid grid-cols-2 sm:grid-cols-2 auto-rows-fr flex-1">
        {items.map((item, idx) => {
          const isActive = platform === item.key;
          return (
            <Stat
              key={item.key}
              number={item.number}
              label={item.label}
              index={idx}
              active={isActive}
              platformColor={platformColor}
            />
          );
        })}
      </div>
      <Separator />
      {/* Tips: hidden on very small screens, toggleable */}
      <div className="p-3 sm:p-4 flex flex-col gap-2 text-[13px] sm:text-xs text-muted-foreground">
        <div className="flex items-center justify-between sm:hidden">
          <button
            type="button"
            onClick={() => setShowTips((v) => !v)}
            className="text-[11px] px-2 py-1 rounded bg-white/60 dark:bg-neutral-800/60 backdrop-blur border border-black/10 dark:border-white/10"
            aria-expanded={showTips}
            aria-controls="mobile-tips"
          >
            {showTips ? 'Hide Tips' : 'Show Tips'}
          </button>
        </div>
        <div
          id="mobile-tips"
          className={`space-y-1 ${
            showTips ? 'block' : 'hidden'
          } sm:block transition-all`}
        >
          <p>Tip: Keep Instagram captions concise for better engagement.</p>
          <p>Facebook allows longer posts—use the extra space wisely.</p>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label, index, active, platformColor }) {
  const topRow = index < 2;
  const rightCol = index % 2 === 1;
  // Platform-specific subtle tints
  const tintMap = {
    'ring-pink-500': {
      bg: 'bg-pink-50/80 dark:bg-pink-950/40',
      bgInteractive:
        'hover:bg-pink-50/80 dark:hover:bg-pink-950/40 focus-visible:bg-pink-50/80 dark:focus-visible:bg-pink-950/40',
      num: 'text-pink-600 dark:text-pink-300',
      numInteractive:
        'hover:text-pink-600 dark:hover:text-pink-300 focus-visible:text-pink-600 dark:focus-visible:text-pink-300',
      ringInteractive: 'hover:ring-pink-500 focus-visible:ring-pink-500',
    },
    'ring-blue-600': {
      bg: 'bg-blue-50/80 dark:bg-blue-950/40',
      bgInteractive:
        'hover:bg-blue-50/80 dark:hover:bg-blue-950/40 focus-visible:bg-blue-50/80 dark:focus-visible:bg-blue-950/40',
      num: 'text-blue-600 dark:text-blue-300',
      numInteractive:
        'hover:text-blue-600 dark:hover:text-blue-300 focus-visible:text-blue-600 dark:focus-visible:text-blue-300',
      ringInteractive: 'hover:ring-blue-600 focus-visible:ring-blue-600',
    },
    'ring-sky-500': {
      bg: 'bg-sky-50/80 dark:bg-sky-950/40',
      bgInteractive:
        'hover:bg-sky-50/80 dark:hover:bg-sky-950/40 focus-visible:bg-sky-50/80 dark:focus-visible:bg-sky-950/40',
      num: 'text-sky-600 dark:text-sky-300',
      numInteractive:
        'hover:text-sky-600 dark:hover:text-sky-300 focus-visible:text-sky-600 dark:focus-visible:text-sky-300',
      ringInteractive: 'hover:ring-sky-500 focus-visible:ring-sky-500',
    },
  };
  const tint = tintMap[platformColor] || {
    bg: 'bg-white/60 dark:bg-neutral-800/50',
    bgInteractive:
      'hover:bg-white/60 dark:hover:bg-neutral-800/50 focus-visible:bg-white/60 dark:focus-visible:bg-neutral-800/50',
    num: 'text-foreground',
    numInteractive: 'hover:text-foreground focus-visible:text-foreground',
    ringInteractive: 'hover:ring-primary focus-visible:ring-primary',
  };
  const baseRing = `ring-inset ring-2 ${platformColor}`;
  return (
    <section
      className={`relative flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-200 ease-out ${
        topRow ? 'border-b border-black/5' : ''
      } ${rightCol ? 'border-l border-black/5' : ''} ${
        active ? `${tint.bg} ${baseRing}` : ''
      } ${tint.bgInteractive} ring-inset hover:ring-2 focus-visible:ring-2 ${
        tint.ringInteractive
      } outline-none`}
      tabIndex={0}
      aria-pressed={active}
    >
      <span
        className={`text-2xl sm:text-3xl font-semibold transition-colors duration-200 ease-out ${
          number < 0
            ? 'text-destructive'
            : active
            ? tint.num
            : 'text-foreground'
        } ${tint.numInteractive}`}
      >
        {number}
      </span>
      <h2
        className={`tracking-wide uppercase text-[11px] sm:text-xs font-medium mt-1 ${
          active ? 'text-muted-foreground/90' : 'text-muted-foreground'
        }`}
      >
        {label}
      </h2>
    </section>
  );
}

export default memo(Stats);
export const MemoStat = memo(Stat);
