import { load as yamlLoad } from 'js-yaml';

// ── Raw imports (parsed at module load time) ─────────────────────────────────
import heroItRaw from './it/hero.md?raw';
import navbarItRaw from './it/navbar.md?raw';
import statsbarItRaw from './it/statsbar.md?raw';
import whySellItRaw from './it/why-sell.md?raw';
import specsItRaw from './it/specs.md?raw';
import featuresItRaw from './it/features.md?raw';
import galleryItRaw from './it/gallery.md?raw';
import conditionItRaw from './it/condition.md?raw';
import contactItRaw from './it/contact.md?raw';
import footerItRaw from './it/footer.md?raw';

import heroEnRaw from './en/hero.md?raw';
import navbarEnRaw from './en/navbar.md?raw';
import statsbarEnRaw from './en/statsbar.md?raw';
import whySellEnRaw from './en/why-sell.md?raw';
import specsEnRaw from './en/specs.md?raw';
import featuresEnRaw from './en/features.md?raw';
import galleryEnRaw from './en/gallery.md?raw';
import conditionEnRaw from './en/condition.md?raw';
import contactEnRaw from './en/contact.md?raw';
import footerEnRaw from './en/footer.md?raw';

// ── Parser ────────────────────────────────────────────────────────────────────
function parseMd(raw: string): unknown {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  try {
    return (yamlLoad(match[1]) as unknown) ?? {};
  } catch {
    console.error('Failed to parse markdown frontmatter');
    return {};
  }
}

// ── Content types ─────────────────────────────────────────────────────────────
export interface HeroContent {
  badge_prefix: string;
  badge_suffix: string;
  tagline: string;
  highlights: string[];
  cta_contact: string;
  cta_features: string;
}

export interface NavLink {
  id: string;
  label: string;
}

export interface NavbarContent {
  links: NavLink[];
  cta: string;
}

export interface StatItem {
  label: string;
  value?: string;
  sub?: string;
}

export interface StatsBarContent {
  stats: StatItem[];
}

export interface SellingPoint {
  icon: string;
  title: string;
  body: string;
  accent?: boolean;
  badge?: string;
}

export interface WhySellContent {
  eyebrow: string;
  title: string;
  badge_unique: string;
  points: SellingPoint[];
}

export interface SpecLabels {
  code: string;
  displacement: string;
  power: string;
  technology: string;
  transmission: string;
  fuel: string;
  emission: string;
  consumption: string;
  co2: string;
  tank: string;
  body_type: string;
  year: string;
  registration: string;
  variant: string;
  ext_color: string;
  roof: string;
  window_frames: string;
  seats: string;
  upholstery: string;
  dashboard: string;
  inserts: string;
}

export interface SpecValues {
  roof: string;
  body_type: string;
}

export interface SpecsContent {
  eyebrow: string;
  title: string;
  engine_title: string;
  performance_title: string;
  exterior_title: string;
  labels: SpecLabels;
  values: SpecValues;
}

export interface FeatureItem {
  name: string;
  description: string;
  icon: string;
}

export interface FeatureCategory {
  id: string;
  label: string;
  items: FeatureItem[];
}

export interface FeaturesContent {
  eyebrow: string;
  title: string;
  categories: FeatureCategory[];
}

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  label?: string;
}

export interface GalleryContent {
  eyebrow: string;
  title: string;
  media: MediaItem[];
}

export interface ConditionItem {
  label: string;
  value?: string;
  dynamic?: string;
  note: string;
  status: 'excellent' | 'good' | 'info';
}

export interface ConditionContent {
  eyebrow: string;
  title: string;
  items: ConditionItem[];
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  intro: string;
  phone_label: string;
  email_label: string;
  price_label: string;
  price_value: string;
  price_note: string;
  year_label: string;
  roof_color_label: string;
  cta_email: string;
  cta_phone: string;
}

export interface FooterContent {
  tagline: string;
  legal: string;
}

// ── Parsed content ────────────────────────────────────────────────────────────
export const content = {
  it: {
    hero:      parseMd(heroItRaw)      as HeroContent,
    navbar:    parseMd(navbarItRaw)    as NavbarContent,
    statsbar:  parseMd(statsbarItRaw)  as StatsBarContent,
    whySell:   parseMd(whySellItRaw)   as WhySellContent,
    specs:     parseMd(specsItRaw)     as SpecsContent,
    features:  parseMd(featuresItRaw)  as FeaturesContent,
    gallery:   parseMd(galleryItRaw)   as GalleryContent,
    condition: parseMd(conditionItRaw) as ConditionContent,
    contact:   parseMd(contactItRaw)   as ContactContent,
    footer:    parseMd(footerItRaw)    as FooterContent,
  },
  en: {
    hero:      parseMd(heroEnRaw)      as HeroContent,
    navbar:    parseMd(navbarEnRaw)    as NavbarContent,
    statsbar:  parseMd(statsbarEnRaw)  as StatsBarContent,
    whySell:   parseMd(whySellEnRaw)   as WhySellContent,
    specs:     parseMd(specsEnRaw)     as SpecsContent,
    features:  parseMd(featuresEnRaw)  as FeaturesContent,
    gallery:   parseMd(galleryEnRaw)   as GalleryContent,
    condition: parseMd(conditionEnRaw) as ConditionContent,
    contact:   parseMd(contactEnRaw)   as ContactContent,
    footer:    parseMd(footerEnRaw)    as FooterContent,
  },
} as const;

export type Language = keyof typeof content;
