import { describe, it, expect } from 'vitest';
import { computeStats, effectiveLengthForPlatform } from './stats';

const limits = { instagram: 280, facebook: 2200, twitter: 280 };

describe('computeStats', () => {
  it('handles empty string', () => {
    const s = computeStats('', limits);
    expect(s.numberOfCharacters).toBe(0);
    expect(s.numberOfWords).toBe(0);
    expect(s.instagramCharactersLeft).toBe(280);
    expect(s.facebookCharactersLeft).toBe(2200);
    expect(s.twitterCharactersLeft).toBe(280);
  });

  it('counts one word', () => {
    const s = computeStats('hello', limits);
    expect(s.numberOfCharacters).toBe(5);
    expect(s.numberOfWords).toBe(1);
  });

  it('trims and splits on whitespace', () => {
    const s = computeStats('  one   two\nthree  ', limits);
    expect(s.numberOfWords).toBe(3);
  });

  it('computes remaining characters', () => {
    const s = computeStats('a'.repeat(300), limits);
    expect(s.instagramCharactersLeft).toBe(-20);
    expect(s.facebookCharactersLeft).toBe(1900);
    expect(s.twitterCharactersLeft).toBe(-20);
  });

  it('grapheme counting treats emoji sequences as single units', () => {
    const str = 'A👍🏽B'; // emoji with skin tone modifier counts as one grapheme cluster
    const s = computeStats(str, limits);
    expect(s.numberOfCharacters).toBe(3); // A, 👍🏽, B
  });

  it('twitter adjusted length replaces URLs with fixed t.co length (23)', () => {
    const text = 'Check this https://example.com and this http://foo.bar/baz';
    const rawLen = Array.from(text).length; // approximate raw code point length
    const twitterEff = effectiveLengthForPlatform(text, 'twitter');
    // Should be rawLen minus both URL lengths plus 2 * 23
    const urlMatches = text.match(/(https?:\/\/\S+|www\.[^\s]+)/g) || [];
    const urlsRawTotal = urlMatches.reduce((acc, u) => acc + Array.from(u).length, 0);
    const expected = rawLen - urlsRawTotal + 23 * urlMatches.length;
    expect(twitterEff).toBe(expected);
  });
});
