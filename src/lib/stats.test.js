import { describe, it, expect } from 'vitest';
import { computeStats } from './stats';

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
});
