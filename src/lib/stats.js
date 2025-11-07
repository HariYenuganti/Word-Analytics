const TCO_LENGTH = 23;

function graphemeCount(str) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    try {
      const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
      return Array.from(seg.segment(str)).length;
    } catch (e) {
      // fallthrough
    }
  }
  // Fallback: count code points (handles surrogate pairs but not ZWJ clusters)
  return Array.from(str).length;
}

function twitterAdjustedLength(str) {
  const base = graphemeCount(str);
  const urlRegex = /(https?:\/\/\S+|www\.[^\s]+)/gi;
  let adjusted = base;
  let match;
  while ((match = urlRegex.exec(str)) !== null) {
    const url = match[0];
    adjusted -= graphemeCount(url);
    adjusted += TCO_LENGTH;
  }
  return adjusted;
}

export function effectiveLengthForPlatform(text, platform) {
  if (platform === 'twitter') return twitterAdjustedLength(text);
  return graphemeCount(text);
}

export function computeStats(text, limits) {
  const trimmed = text.trim();
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  const length = graphemeCount(text);
  const twLen = typeof limits.twitter === 'number' ? twitterAdjustedLength(text) : undefined;
  return {
    numberOfCharacters: length,
    instagramCharactersLeft: limits.instagram - length,
    facebookCharactersLeft: limits.facebook - length,
    twitterCharactersLeft:
      typeof limits.twitter === 'number' ? limits.twitter - twLen : undefined,
    numberOfWords: words,
  };
}

export { graphemeCount };
