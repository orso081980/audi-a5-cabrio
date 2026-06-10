import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { useCar } from '../../contexts/CarContext';
import { useContent } from '../../hooks/useContent';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Hero() {
  const { model } = useCar();
  const hero = useContent('hero');

  return (
    <section
      id="overview"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-black"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 hero-grid-bg opacity-100" />
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-brand-surface/40 via-brand-black/70 to-brand-black" />
        {/* Red glow orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-red/8 blur-[120px] animate-float" />
        <div
          className="absolute bottom-1/3 left-1/5 w-72 h-72 rounded-full bg-brand-red/5 blur-[100px] animate-float"
          style={{ animationDelay: '2s' }}
        />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-24 text-center">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-red/25 bg-brand-red/8 text-brand-red text-xs font-medium tracking-wide mb-8 animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          <Icon name="star" size={11} />
          <span>{hero.badge_prefix} {hero.badge_suffix} · {model.mileage.toLocaleString('it-IT')} km</span>
        </div>

        {/* Title */}
        <h1
          className="font-display animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="block text-white/40 text-2xl md:text-3xl font-light tracking-[0.15em] uppercase mb-1">
            {model.make}
          </span>
          <span className="block text-6xl md:text-8xl font-light text-brand-white leading-none mb-3">
            {'A'}
            <span className="text-brand-red">5</span>
            {' Cabriolet'}
          </span>
          <span className="block text-xl md:text-2xl font-light text-white/50 tracking-wide">
            {model.variant}
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="mt-6 text-white/45 text-sm md:text-base tracking-wide animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          {hero.tagline}
        </p>

        {/* Feature pills */}
        <div
          className="mt-8 flex flex-wrap justify-center gap-2 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          {hero.highlights.slice(0, 6).map((h) => (
            <span
              key={h}
              className="px-3 py-1 rounded-full bg-brand-surface border border-white/10 text-white/65 text-xs"
            >
              {h}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          <Button size="lg" onClick={() => scrollTo('contact')}>
            <Icon name="phone" size={16} />
            {hero.cta_contact}
          </Button>
          <Button variant="ghost" size="lg" onClick={() => scrollTo('features')}>
            {hero.cta_features}
            <Icon name="arrowRight" size={16} />
          </Button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 text-xs tracking-widest uppercase">
        <span>Scorri</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
