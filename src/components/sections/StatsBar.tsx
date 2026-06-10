import { useCar } from '../../contexts/CarContext';
import { useContent } from '../../hooks/useContent';

interface StatItemProps {
  value: string;
  label: string;
  sub?: string;
}

function StatItem({ value, label, sub }: StatItemProps) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1 px-4 py-6 border-r border-white/8 last:border-r-0">
      <span className="font-display text-2xl md:text-3xl font-light text-brand-white">{value}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-white/40">{label}</span>
      {sub && <span className="text-xs text-white/25 mt-0.5">{sub}</span>}
    </div>
  );
}

export function StatsBar() {
  const { model } = useCar();
  const s = useContent('statsbar');

  const dynamicValues: Record<number, string> = {
    0: model.powerDisplay,
    1: 'MHEV',
    2: model.consumption,
    3: model.transmissionShort,
    4: '19"',
    5: String(model.immatriculation),
  };

  return (
    <section className="bg-brand-deep border-y border-white/8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap">
          {s.stats.map((stat, i) => (
            <StatItem
              key={i}
              value={stat.value ?? dynamicValues[i] ?? ''}
              label={stat.label}
              sub={stat.sub}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
