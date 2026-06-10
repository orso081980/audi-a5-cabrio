import { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';
import type { IconName } from '../../types/car';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../utils/cn';
import { useContent } from '../../hooks/useContent';
import type { FeatureItem } from '../../content/index';

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const [open, setOpen] = useState(false);
  const [ref, visible] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'bg-brand-surface border rounded-xl overflow-hidden cursor-pointer transition-all duration-300',
        open
          ? 'border-brand-red/30 shadow-lg shadow-brand-red/5'
          : 'border-white/8 hover:border-white/18',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{ transitionDelay: visible ? `${index * 50}ms` : '0ms' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-3 p-4">
        <div className={cn(
          'shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
          open ? 'bg-brand-red/15 text-brand-red' : 'bg-white/6 text-white/50'
        )}>
          <Icon name={feature.icon as IconName} size={16} />
        </div>
        <span className="flex-1 text-sm text-brand-white font-medium leading-snug">
          {feature.name}
        </span>
        <span className={cn(
          'shrink-0 text-white/30 transition-transform duration-200',
          open && 'rotate-180'
        )}>
          <Icon name="chevronDown" size={15} />
        </span>
      </div>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <div className="border-t border-white/6 pt-3">
            <p className="text-sm text-white/55 leading-relaxed">{feature.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function Features() {
  const feat = useContent('features');
  const [activeCategory, setActiveCategory] = useState(feat.categories[0]?.id ?? 'technology');
  const [headingRef, headingVisible] = useInView<HTMLDivElement>();

  const activeData = feat.categories.find((c) => c.id === activeCategory);

  return (
    <section id="features" className="py-24 bg-brand-black">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={headingRef}
          className={`transition-all duration-700 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <SectionHeading eyebrow={feat.eyebrow} title={feat.title} />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {feat.categories.map((cat) => {
            const count = cat.items.length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer',
                  activeCategory === cat.id
                    ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                    : 'bg-brand-surface border border-white/10 text-white/60 hover:text-white hover:border-white/20'
                )}
              >
                {cat.label}
                <span className={cn(
                  'text-xs px-1.5 py-0.5 rounded-full font-medium',
                  activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-white/8 text-white/50'
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activeData?.items.map((feature, i) => (
            <FeatureCard key={feature.name} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
