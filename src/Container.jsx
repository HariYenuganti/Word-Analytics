import { useMemo, useState } from 'react';
import Textarea from './Textarea';
import Stats from './Stats';

export default function Container() {
  const [text, setText] = useState('');

  // Character limits (single source of truth)
  const INSTAGRAM_MAX = 280;
  const FACEBOOK_MAX = 2200;

  // Derive statistics from current text
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
    const length = text.length;
    return {
      numberOfCharacters: length,
      instagramCharactersLeft: INSTAGRAM_MAX - length,
      facebookCharactersLeft: FACEBOOK_MAX - length,
      numberOfWords: words,
    };
  }, [text]);

  return (
    <main className="container">
      <Textarea text={text} setText={setText} />
      <Stats stats={stats} />
    </main>
  );
}
