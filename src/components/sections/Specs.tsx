import { useCar } from '../../contexts/CarContext';
import { SectionHeading } from '../ui/SectionHeading';
import { useInView } from '../../hooks/useInView';
import { useContent } from '../../hooks/useContent';

interface SpecRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function SpecRow({ label, value, highlight }: SpecRowProps) {
  return (
    <div className={`flex justify-between items-start py-3 border-b border-white/6 last:border-0 ${highlight ? 'text-brand-white' : ''}`}>
      <dt className="text-xs uppercase tracking-wider text-white/35 font-medium">{label}</dt>
      <dd className={`text-sm text-right ml-4 max-w-[55%] ${highlight ? 'text-brand-red font-medium' : 'text-white/70'}`}>
        {value}
      </dd>
    </div>
  );
}

interface SpecBlockProps {
  title: string;
  children: React.ReactNode;
}

function SpecBlock({ title, children }: SpecBlockProps) {
  return (
    <div className="bg-brand-surface border border-white/8 rounded-xl p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red mb-4">
        {title}
      </h3>
      <dl>{children}</dl>
    </div>
  );
}

export function Specs() {
  const { car, model } = useCar();
  const [ref, visible] = useInView<HTMLDivElement>();
  const s = useContent('specs');
  const l = s.labels;
  const v = s.values;

  return (
    <section id="specs" className="py-24 bg-brand-deep">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <SectionHeading eyebrow={s.eyebrow} title={s.title} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Engine */}
          <SpecBlock title={s.engine_title}>
            <SpecRow label={l.code} value={car.engine.code} highlight />
            <SpecRow label={l.displacement} value={car.engine.displacement} />
            <SpecRow label={l.power} value={`${car.engine.power_kw} kW / ${car.engine.power_hp} CV`} highlight />
            <SpecRow label={l.technology} value={car.engine.technology} />
            <SpecRow label={l.transmission} value={model.transmissionShort} />
            <SpecRow label={l.fuel} value={car.engine.fuel} />
            <SpecRow label={l.emission} value={car.engine.emission_standard} />
          </SpecBlock>

          {/* Performance + Body */}
          <SpecBlock title={s.performance_title}>
            <SpecRow label={l.consumption} value={car.performance.fuel_consumption_combined} highlight />
            <SpecRow label={l.co2} value={car.performance.co2_emissions_combined} />
            <SpecRow label={l.tank} value={`${car.performance.fuel_tank_litres} L`} />
            <SpecRow label={l.body_type} value={v.body_type} />
            <SpecRow label={l.year} value={String(car.year)} />
            <SpecRow label={l.registration} value={String(car.immatriculation)} highlight />
            <SpecRow label={l.variant} value={car.variant} />
          </SpecBlock>

          {/* Colors + Interior */}
          <SpecBlock title={s.exterior_title}>
            <SpecRow label={l.ext_color} value={car.exterior.color} highlight />
            <SpecRow label={l.roof} value={v.roof} highlight />
            <SpecRow label={l.window_frames} value={car.exterior.window_frames} />
            <SpecRow label={l.seats} value={car.interior.seat_material} />
            <SpecRow label={l.upholstery} value={car.interior.seats} />
            <SpecRow label={l.dashboard} value={car.interior.dashboard} />
            <SpecRow label={l.inserts} value={car.interior.decorative_inserts} />
          </SpecBlock>

        </div>
      </div>
    </section>
  );
}
