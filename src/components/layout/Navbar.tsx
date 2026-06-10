import { useState } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { useScrolled } from '../../hooks/useScrolled';
import { useContent } from '../../hooks/useContent';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Language } from '../../contexts/LanguageContext';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function ItalianFlag() {
  return (
    <svg viewBox="0 0 30 20" width="24" height="16" aria-label="Italiano">
      <rect width="10" height="20" fill="#009246" />
      <rect x="10" width="10" height="20" fill="#ffffff" />
      <rect x="20" width="10" height="20" fill="#ce2b37" />
    </svg>
  );
}

function UKFlag() {
  return (
    <svg viewBox="0 0 60 30" width="24" height="16" aria-label="English">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      <rect x="24" width="12" height="30" fill="#ffffff" />
      <rect y="9" width="60" height="12" fill="#ffffff" />
      <rect x="26" width="8" height="30" fill="#C8102E" />
      <rect y="11" width="60" height="8" fill="#C8102E" />
    </svg>
  );
}

function FlagButton({ lang, current, onSelect }: { lang: Language; current: Language; onSelect: (l: Language) => void }) {
  const active = lang === current;
  return (
    <button
      onClick={() => onSelect(lang)}
      className={cn(
        'p-1 rounded transition-opacity',
        active ? 'opacity-100 ring-1 ring-white/20 ring-offset-1 ring-offset-transparent' : 'opacity-40 hover:opacity-70'
      )}
      title={lang === 'it' ? 'Italiano' : 'English'}
      aria-pressed={active}
    >
      {lang === 'it' ? <ItalianFlag /> : <UKFlag />}
    </button>
  );
}

export function Navbar() {
  const scrolled = useScrolled(60);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const nav = useContent('navbar');

  const handleNav = (id: string) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-brand-black/92 backdrop-blur-xl border-b border-white/8'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-8">
        {/* Brand */}
        <div className="flex items-center gap-2 mr-auto">
          <span className="text-brand-red text-xl leading-none">◈</span>
          <span className="font-display text-lg font-medium tracking-wide text-brand-white">
            A5 Cabriolet
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {nav.links.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => handleNav(id)}
                className="px-4 py-2 text-sm text-white/65 hover:text-brand-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Language switcher */}
        <div className="hidden md:flex items-center gap-1">
          <FlagButton lang="it" current={language} onSelect={setLanguage} />
          <FlagButton lang="en" current={language} onSelect={setLanguage} />
        </div>

        {/* CTA */}
        <Button
          size="sm"
          onClick={() => handleNav('contact')}
          className="hidden md:inline-flex"
        >
          {nav.cta}
        </Button>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Menu"
        >
          <Icon name={mobileOpen ? 'x' : 'menu'} size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-deep/98 backdrop-blur-xl border-t border-white/8 px-6 py-4 flex flex-col gap-1">
          {nav.links.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className="text-left px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
          {/* Language switcher mobile */}
          <div className="flex items-center gap-2 px-4 py-3">
            <FlagButton lang="it" current={language} onSelect={setLanguage} />
            <FlagButton lang="en" current={language} onSelect={setLanguage} />
          </div>
          <div className="pt-2">
            <Button fullWidth onClick={() => handleNav('contact')}>
              {nav.cta}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
