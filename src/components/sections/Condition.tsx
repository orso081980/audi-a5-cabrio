import { SectionHeading } from '../ui/SectionHeading';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../utils/cn';
import { useContent } from '../../hooks/useContent';
import { useCar } from '../../contexts/CarContext';
import type { ConditionItem } from '../../content/index';

const statusDot: Record<ConditionItem['status'], string> = {
  excellent: 'bg-emerald-500',
  good:      'bg-amber-400',
  info:      'bg-brand-silver',
};

function ConditionCard({ item, displayValue, index }: { item: ConditionItem; displayValue: string; index: number }) {
  const [ref, visible] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        'bg-brand-surface border border-white/8 rounded-xl p-5 transition-all duration-500',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs uppercase tracking-widest text-white/30 font-semibold">{item.label}</span>
        <span className={`w-2.5 h-2.5 rounded-full mt-0.5 ${statusDot[item.status]}`} />
      </div>
      <div className="font-display text-2xl font-light text-brand-white mb-1">{displayValue}</div>
      <div className="text-xs text-white/35">{item.note}</div>
    </div>
  );
}

export function Condition() {
  const [ref, visible] = useInView<HTMLDivElement>();
  const cond = useContent('condition');
  const { model } = useCar();

  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <SectionHeading eyebrow={cond.eyebrow} title={cond.title} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cond.items.map((item, i) => {
            const displayValue =
              item.dynamic === 'mileage'
                ? `${model.mileage.toLocaleString('it-IT')} km`
                : (item.value ?? '');
            return (
              <ConditionCard key={item.label} item={item} displayValue={displayValue} index={i} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
