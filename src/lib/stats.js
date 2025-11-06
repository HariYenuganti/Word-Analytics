export function computeStats(text, limits) {
  const trimmed = text.trim();
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  const length = text.length;
  return {
    numberOfCharacters: length,
    instagramCharactersLeft: limits.instagram - length,
    facebookCharactersLeft: limits.facebook - length,
    twitterCharactersLeft:
      typeof limits.twitter === 'number' ? limits.twitter - length : undefined,
    numberOfWords: words,
  };
}
