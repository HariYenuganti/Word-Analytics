import { effectiveLengthForPlatform } from './stats';

export function splitIntoTwitterSegments(
  text: string,
  maxEffective = 280
): string[] {
  if (!text) return [];
  const words = text.split(/(\s+)/); // keep whitespace tokens
  const segments: string[] = [];
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
