import { Icon } from '../ui/Icon';
import type { IconName } from '../../types/car';
import { useInView } from '../../hooks/useInView';
import { SectionHeading } from '../ui/SectionHeading';
import { useContent } from '../../hooks/useContent';

interface CardProps {
  icon: string;
  title: string;
  body: string;
  accent?: boolean;
  badgeLabel: string;
  index: number;
}

function SellingCard({ icon, title, body, accent, badgeLabel, index }: CardProps) {
  const [ref, visible] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`
        relative p-6 rounded-xl border transition-all duration-700
        ${accent
          ? 'bg-brand-red/8 border-brand-red/25 hover:border-brand-red/50'
          : 'bg-brand-surface border-white/8 hover:border-white/20'
        }
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={`
        w-11 h-11 rounded-lg flex items-center justify-center mb-4
        ${accent ? 'bg-brand-red/15 text-brand-red' : 'bg-white/6 text-white/60'}
      `}>
        <Icon name={icon as IconName} size={20} />
      </div>
      <h3 className="font-display text-xl font-medium text-brand-white mb-2">{title}</h3>
      <p className="text-sm text-white/55 leading-relaxed">{body}</p>
      {accent && (
        <div className="absolute top-4 right-4">
          <span className="text-xs text-brand-red/70 bg-brand-red/10 px-2 py-0.5 rounded-full border border-brand-red/20">
            {badgeLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export function WhySellSection() {
  const [ref, visible] = useInView<HTMLDivElement>();
  const ws = useContent('whySell');

  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <SectionHeading
            eyebrow={ws.eyebrow}
            title={ws.title}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ws.points.map((point, i) => (
            <SellingCard
              key={point.title}
              icon={point.icon}
              title={point.title}
              body={point.body}
              accent={point.accent}
              badgeLabel={ws.badge_unique}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
