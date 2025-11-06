import { memo, useMemo } from 'react';

/**
 * @param {{
 *  stats: {
 *    numberOfWords: number,
 *    numberOfCharacters: number,
 *    instagramCharactersLeft: number,
 *    facebookCharactersLeft: number,
 *  }
 * }} props
 */
function Stats({ stats }) {
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
    ],
    [
      stats.numberOfWords,
      stats.numberOfCharacters,
      stats.instagramCharactersLeft,
      stats.facebookCharactersLeft,
    ]
  );

  return (
    <section className="stats">
      {items.map((item) => (
        <Stat key={item.key} number={item.number} label={item.label} />
      ))}
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <section className="stat">
      <span
        className={`stat__number ${number < 0 ? 'stat__number--limit' : ''}`}
      >
        {number}
      </span>
      <h2 className="second-heading">{label}</h2>
    </section>
  );
}

export default memo(Stats);
export const MemoStat = memo(Stat);
