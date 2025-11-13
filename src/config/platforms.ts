import { LIMITS_DEFAULT } from '../constants';

export type PlatformKey = 'instagram' | 'facebook' | 'twitter';

export interface PlatformTheme {
  key: PlatformKey;
  label: string;
  limit: number;
  ringClass: string;
  progressBg: string;
  labelClass: string;
  tint: {
    bg: string;
    bgInteractive: string;
    num: string;
    numInteractive: string;
    ringInteractive: string;
  };
  tips: string;
  hashtag: { guide: string; range: [number, number] };
}

export const PLATFORMS: Record<PlatformKey, PlatformTheme> = {
  instagram: {
    key: 'instagram',
    label: 'Instagram',
    limit: LIMITS_DEFAULT.instagram,
    ringClass: 'ring-pink-500',
    progressBg: 'bg-pink-500',
    labelClass: 'text-pink-600 dark:text-pink-400',
    tint: {
      bg: 'bg-pink-50/80 dark:bg-pink-950/55',
      bgInteractive:
        'hover:bg-pink-50/80 dark:hover:bg-pink-950/55 focus-visible:bg-pink-50/80 dark:focus-visible:bg-pink-950/55',
      num: 'text-pink-600 dark:text-pink-300',
      numInteractive:
        'hover:text-pink-600 dark:hover:text-pink-300 focus-visible:text-pink-600 dark:focus-visible:text-pink-300',
      ringInteractive: 'hover:ring-pink-500 focus-visible:ring-pink-500',
    },
    tips: "Keep it concise and engaging. Hashtags help, but don't overdo it.",
    hashtag: {
      guide: '3–5 recommended',
      range: [3, 5],
    },
  },
  facebook: {
    key: 'facebook',
    label: 'Facebook',
    limit: LIMITS_DEFAULT.facebook,
    ringClass: 'ring-blue-600',
    progressBg: 'bg-blue-600',
    labelClass: 'text-blue-600 dark:text-blue-400',
    tint: {
      bg: 'bg-blue-50/80 dark:bg-blue-950/55',
      bgInteractive:
        'hover:bg-blue-50/80 dark:hover:bg-blue-950/55 focus-visible:bg-blue-50/80 dark:focus-visible:bg-blue-950/55',
      num: 'text-blue-600 dark:text-blue-300',
      numInteractive:
        'hover:text-blue-600 dark:hover:text-blue-300 focus-visible:text-blue-600 dark:focus-visible:text-blue-300',
      ringInteractive: 'hover:ring-blue-600 focus-visible:ring-blue-600',
    },
    tips: 'Longer posts are okay. Lead with the main point; break lines for readability.',
    hashtag: {
      guide: '0–2 recommended',
      range: [0, 2],
    },
  },
  twitter: {
    key: 'twitter',
    label: 'Twitter',
    limit: LIMITS_DEFAULT.twitter,
    ringClass: 'ring-sky-500',
    progressBg: 'bg-sky-500',
    labelClass: 'text-sky-600 dark:text-sky-400',
    tint: {
      bg: 'bg-sky-50/80 dark:bg-sky-950/55',
      bgInteractive:
        'hover:bg-sky-50/80 dark:hover:bg-sky-950/55 focus-visible:bg-sky-50/80 dark:focus-visible:bg-sky-950/55',
      num: 'text-sky-600 dark:text-sky-300',
      numInteractive:
        'hover:text-sky-600 dark:hover:text-sky-300 focus-visible:text-sky-600 dark:focus-visible:text-sky-300',
      ringInteractive: 'hover:ring-sky-500 focus-visible:ring-sky-500',
    },
    tips: 'Stay within 280 chars. Use threads for depth and keep one idea per tweet.',
    hashtag: {
      guide: '1–2 recommended',
      range: [1, 2],
    },
  },
};

// Single source of truth for limits
export const LIMITS = LIMITS_DEFAULT;
