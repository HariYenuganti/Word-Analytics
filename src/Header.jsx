import H1 from './H1';
import Logo from './Logo';
import Subheading from './Subheading';
import ThemeToggle from './ThemeToggle';
import { Button } from './components/ui/button';
import { Github, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Dialog } from './components/ui/dialog.jsx';

export default function Header() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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
  useEffect(() => {
    // Trigger subtle entrance animations once mounted
    setMounted(true);
  }, []);
  return (
    <header className="hero-header relative w-full overflow-hidden min-h-[clamp(260px,46vh,520px)] md:min-h-[clamp(320px,48vh,560px)] pt-[env(safe-area-inset-top)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-primary text-primary-foreground px-3 py-1.5 rounded-md"
      >
        Skip to content
      </a>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 header-animated-gradient dark:opacity-90 opacity-80 mix-blend-normal backdrop-blur-sm"></div>
        <div className="absolute inset-0 header-noise opacity-[0.12] dark:opacity-[0.18]"></div>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[80vw] h-48 blur-2xl opacity-50 dark:opacity-60 bg-gradient-to-r from-fuchsia-400/40 via-indigo-400/30 to-sky-400/40 rounded-full"></div>
        {/* Gentle fade at the bottom to blend with page background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background"></div>
      </div>
      <div className="sticky top-0 z-40 w-full transition-all duration-300">
        <div
          className={`relative w-[92vw] max-w-[1320px] mx-auto ${
            scrolled ? 'pt-0.5 pb-0.5' : 'pt-1.5 pb-1'
          } transition-all duration-300`}
        >
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between flex-nowrap transition-all duration-300 backdrop-blur-md rounded-xl px-3 sm:px-4 ${
              scrolled
                ? 'py-1 bg-white/55 dark:bg-neutral-900/50 border border-white/50 dark:border-white/20 shadow-md'
                : 'py-1.5 bg-white/65 dark:bg-neutral-900/55 border border-white/40 dark:border-white/10 shadow-sm'
            }`}
          >
            <div
              className={`transition-all duration-300 ${
                scrolled ? 'scale-95' : 'scale-100'
              }`}
            >
              <Logo />
            </div>
            <div className="flex items-center gap-2 flex-nowrap min-w-fit">
              <Button
                variant="ghost"
                size="icon"
                aria-label="About"
                onClick={() => setAboutOpen(true)}
                className="shrink-0"
              >
                <Info className="h-4 w-4" />
              </Button>
              <Button
                asChild
                variant={scrolled ? 'ghost' : 'outline'}
                size="sm"
                className="shrink-0 transition-colors duration-300 px-2 md:px-3 whitespace-nowrap"
                aria-label="GitHub repository"
              >
                <a
                  href="https://github.com/HariYenuganti/Word-Analytics"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center"
                >
                  <Github className="h-4 w-4" />
                  <span className="ml-2 [@media(min-width:360px)]:inline hidden">
                    Repo
                  </span>
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
      {/* Hero occupies the full top section; extra bottom padding to make room for overlapping card */}
      <div
        className={`hero-body relative w-[92vw] max-w-[1320px] mx-auto ${
          scrolled ? 'pt-2' : 'pt-3'
        } pb-12 sm:pb-16 md:pb-20 transition-all duration-300 min-h-[clamp(210px,38vh,360px)] md:min-h-[clamp(260px,42vh,420px)] flex items-center justify-center text-center`}
      >
        {/* Aurora / diagonal beam behind the text */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div className="w-[140%] h-40 rotate-12 bg-gradient-to-r from-fuchsia-400/20 via-sky-400/12 to-indigo-400/20 blur-2xl [mask-image:radial-gradient(50%_60%_at_50%_50%,white,transparent)]"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center -translate-y-4 sm:-translate-y-6 md:-translate-y-8 transition-transform duration-300">
          <H1 />
          <div
            className={`mt-3 h-px w-36 bg-gradient-to-r from-purple-500/60 via-indigo-500/50 to-sky-500/50 rounded-full transition-opacity duration-300 ${
              scrolled ? 'opacity-40' : 'opacity-100'
            }`}
          />
          <div
            className={`hero-tagline mt-3 max-w-[560px] text-sm sm:text-base transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
          >
            <Subheading />
          </div>
        </div>
      </div>
      <Dialog
        open={aboutOpen}
        onOpenChange={setAboutOpen}
        title="About Word Analytics"
      >
        <p>
          This tool gives real-time word & character counts, platform limits
          (Instagram & Facebook), keyboard shortcuts (Ctrl/Cmd+C to copy,
          Ctrl/Cmd+K to clear), dark mode, and modern UI built with Tailwind +
          shadcn-style components.
        </p>
        <p className="mt-2">
          Feel free to contribute or fork on GitHub. Future enhancements can
          include multi-platform presets and export options.
        </p>
      </Dialog>
    </header>
  );
}
