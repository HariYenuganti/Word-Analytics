export type PlatformKey = 'instagram' | 'facebook' | 'twitter';

export interface Limits {
  instagram: number;
  facebook: number;
  twitter?: number;
}

export interface StatsResult {
  numberOfCharacters: number;
  numberOfWords: number;
  instagramCharactersLeft: number;
  facebookCharactersLeft: number;
  twitterCharactersLeft?: number;
}

const TCO_LENGTH = 23;

type GraphemeSegment = { segment: string };
type IntlSegmenter = { segment: (input: string) => Iterable<GraphemeSegment> };
type IntlWithSegmenter = typeof Intl & {
  Segmenter?: new (
    locale?: string,
    options?: { granularity: 'grapheme' }
  ) => IntlSegmenter;
};

export function graphemeCount(str: string): number {
  const I = Intl as IntlWithSegmenter;
  if (typeof I !== 'undefined' && I.Segmenter) {
    try {
      const seg = new I.Segmenter(undefined, {
        granularity: 'grapheme',
      });
      return Array.from(seg.segment(str)).length;
    } catch {
      // fallthrough
    }
  }
  return Array.from(str).length;
}

function twitterAdjustedLength(str: string): number {
  const base = graphemeCount(str);
  const urlRegex = /(https?:\/\/\S+|www\.[^\s]+)/gi;
  let adjusted = base;
  let match: RegExpExecArray | null;
  while ((match = urlRegex.exec(str)) !== null) {
    const url = match[0];
    adjusted -= graphemeCount(url);
    adjusted += TCO_LENGTH;
  }
  return adjusted;
}

export function effectiveLengthForPlatform(
  text: string,
  platform: PlatformKey
): number {
  if (platform === 'twitter') return twitterAdjustedLength(text);
  return graphemeCount(text);
}

export function computeStats(text: string, limits: Limits): StatsResult {
  const trimmed = text.trim();
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  const length = graphemeCount(text);
  const twLen =
    typeof limits.twitter === 'number'
      ? twitterAdjustedLength(text)
      : undefined;
  return {
    numberOfCharacters: length,
    instagramCharactersLeft: limits.instagram - length,
    facebookCharactersLeft: limits.facebook - length,
    twitterCharactersLeft:
      typeof limits.twitter === 'number'
        ? (limits.twitter as number) - (twLen as number)
        : undefined,
    numberOfWords: words,
  };
}
