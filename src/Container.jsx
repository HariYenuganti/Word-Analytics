import { useMemo, useState, useEffect } from 'react';
import Textarea from './Textarea';
import Stats from './Stats';
import { Card, CardContent } from './components/ui/card';
import { INSTAGRAM_MAX, FACEBOOK_MAX, TWITTER_MAX } from './constants';
import { computeStats } from './lib/stats';

export default function Container() {
  const [text, setText] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('wa-text') ?? '';
      } catch {
        return '';
      }
    }
    return '';
  });
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [platform, setPlatform] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('wa-platform') || 'instagram';
    }
    return 'instagram';
  });
  // Debounce text for stats computation
  const [debouncedText, setDebouncedText] = useState(text);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedText(text), 120);
    return () => clearTimeout(id);
  }, [text]);

  // Derive statistics from current text (debounced)
  const stats = useMemo(() => {
    return computeStats(debouncedText, {
      instagram: INSTAGRAM_MAX,
      facebook: FACEBOOK_MAX,
      twitter: TWITTER_MAX,
    });
  }, [debouncedText]);

  // Persist platform choice
  useEffect(() => {
    try {
      localStorage.setItem('wa-platform', platform);
    } catch (e) {
      /* noop: persistence may be blocked */
    }
  }, [platform]);

  // Persist text (debounced) to localStorage
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem('wa-text', text);
      } catch (e) {
        /* ignore */
      }
    }, 250);
    return () => clearTimeout(id);
  }, [text]);

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main
      id="main-content"
      className="mx-auto -mt-16 xs:-mt-20 sm:-mt-24 md:-mt-40 lg:-mt-48 w-[90vw] max-w-[1050px] relative z-30"
    >
      <Card
        className={`w-full overflow-hidden relative border border-white/60 dark:border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 transition-all duration-500 ${
          scrolled ? 'shadow-2xl' : 'shadow-md'
        } ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      >
        <CardContent className="p-0 h-full flex flex-col md:flex-row items-stretch gap-0 md:gap-4 min-h-[560px] [&>*]:min-w-0 transition-all duration-500">
          <Textarea
            text={text}
            setText={setText}
            length={text.length}
            limits={{
              instagram: INSTAGRAM_MAX,
              facebook: FACEBOOK_MAX,
              twitter: TWITTER_MAX,
            }}
            platform={platform}
            setPlatform={setPlatform}
          />
          <Stats stats={stats} platform={platform} />
        </CardContent>
      </Card>
    </main>
  );
}
