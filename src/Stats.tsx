import { memo, useMemo, useState } from 'react';
import { PLATFORMS } from './config/platforms';
import { Separator } from './components/ui/separator';
import type { StatsResult, PlatformKey } from './lib/stats';

type Props = {
  stats: StatsResult;
  platform: PlatformKey;
};

function Stats({ stats, platform }: Props) {
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
        number: stats.twitterCharactersLeft ?? 0,
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
  const theme =
    PLATFORMS[platform] ||
    ({
      label: 'Platform',
      ringClass: 'ring-primary',
      tint: {
        bg: 'bg-white/60 dark:bg-neutral-800/50',
        bgInteractive:
          'hover:bg-white/60 dark:hover:bg-neutral-800/50 focus-visible:bg-white/60 dark:focus-visible:bg-neutral-800/50',
        num: 'text-foreground',
        numInteractive: 'hover:text-foreground focus-visible:text-foreground',
        ringInteractive: 'hover:ring-primary focus-visible:ring-primary',
      },
      labelClass: 'text-foreground',
    } as const);

  return (
    <section className="md:flex-[1.3] md:min-w-[300px] bg-secondary flex flex-col md:border-l border-black/5 min-w-0 md:pl-2">
      {/* Active platform label */}
      <div className="px-3 sm:px-4 pt-3 sm:pt-4">
        <span
          className={`text-[11px] uppercase tracking-wide font-medium ${theme.labelClass}`}
        >
          Platform: {theme.label}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 auto-rows-fr flex-1">
        {items.map((item, idx) => {
          const isActive = platform === (item.key as PlatformKey);
          return (
            <Stat
              key={item.key}
              number={item.number}
              label={item.label}
              index={idx}
              active={isActive}
              ringClass={theme.ringClass}
              tint={theme.tint}
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

type StatProps = {
  number: number;
  label: string;
  index: number;
  active: boolean;
  ringClass: string;
  tint: {
    bg: string;
    bgInteractive: string;
    num: string;
    numInteractive: string;
    ringInteractive: string;
  };
};

function Stat({ number, label, index, active, ringClass, tint }: StatProps) {
  const topRow = index < 2;
  const rightCol = index % 2 === 1;
  const baseRing = `ring-inset ring-2 ${ringClass}`;
  const isPlatformItem = ['Instagram', 'Facebook', 'Twitter'].includes(label);
  const badge = isPlatformItem ? (
    <span
      className={`mt-1 px-2 py-0.5 rounded-full text-[10px] tracking-wide ${
        number < 0
          ? 'bg-destructive/10 text-destructive'
          : number <= 20
          ? 'bg-amber-500/10 text-amber-600'
          : 'bg-emerald-500/10 text-emerald-600'
      }`}
    >
      {number < 0 ? `${Math.abs(number)} over` : `${number} left`}
    </span>
  ) : null;
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
      {badge}
    </section>
  );
}

export default memo(Stats);
export const MemoStat = memo(Stat);
