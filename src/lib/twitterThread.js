// Split text into effective Twitter segments (280 char effective) preserving words
import { effectiveLengthForPlatform } from './stats';

export function splitIntoTwitterSegments(text, maxEffective = 280) {
  if (!text) return [];
  const words = text.split(/(\s+)/); // keep whitespace tokens
  let segments = [];
  let current = '';
  for (const token of words) {
    const next = current + token;
    const effLen = effectiveLengthForPlatform(next, 'twitter');
    if (effLen > maxEffective && current) {
      segments.push(current.trim());
      current = token.trimStart();
    } else {
      current = next;
    }
  }
  if (current.trim()) segments.push(current.trim());
  return segments.map((seg, i, arr) => `${seg} (${i + 1}/${arr.length})`);
}
