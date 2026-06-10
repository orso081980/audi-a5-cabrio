import { useCar } from '../../contexts/CarContext';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useInView } from '../../hooks/useInView';
import { useContent } from '../../hooks/useContent';

export function Contact() {
  const { car, model } = useCar();
  const [ref, visible] = useInView<HTMLDivElement>();
  const c = useContent('contact');

  return (
    <section id="contact" className="py-24 bg-brand-deep">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left — info */}
            <div className="flex flex-col justify-center">
              <SectionHeading eyebrow={c.eyebrow} title={c.title} />
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
                {c.intro}
              </p>

              <div className="space-y-4">
                <a
                  href="tel:+393926449095"
                  className="flex items-center gap-4 p-4 rounded-xl bg-brand-surface border border-white/8 hover:border-brand-red/25 hover:bg-brand-surface2 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                    <Icon name="phone" size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-white/35 uppercase tracking-wide mb-0.5">{c.phone_label}</div>
                    <div className="text-brand-white font-medium">+39 392 644 9095</div>
                  </div>
                </a>

                <a
                  href="mailto:ctn.marco@hotmail.it"
                  className="flex items-center gap-4 p-4 rounded-xl bg-brand-surface border border-white/8 hover:border-brand-red/25 hover:bg-brand-surface2 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                    <Icon name="mail" size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-white/35 uppercase tracking-wide mb-0.5">{c.email_label}</div>
                    <div className="text-brand-white font-medium">ctn.marco@hotmail.it</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right — car summary card */}
            <div>
              <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 lg:p-8">

                {/* Car summary */}
                <div className="pb-6 mb-6 border-b border-white/8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-display text-2xl font-light text-brand-white">
                        {model.fullName}
                      </h3>
                      <p className="text-white/40 text-sm mt-0.5">{model.variant}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-white/30 uppercase tracking-wide">{c.year_label}</div>
                      <div className="text-brand-white font-medium">{model.year}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {[
                      model.powerDisplay,
                      model.technology,
                      model.transmissionShort,
                      model.exteriorColor,
                    ].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/6 text-white/50 border border-white/8">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Color swatch */}
                  <div className="flex items-center gap-2 mt-4">
                    <span className="w-3 h-3 rounded-full bg-[#1a1a1a] border border-white/20 ring-1 ring-offset-1 ring-offset-brand-surface ring-white/10" />
                    <span className="text-xs text-white/35">{car.exterior.color}</span>
                    <span className="text-white/15 mx-1">·</span>
                    <span className="w-3 h-3 rounded-full bg-brand-red border border-red-900/40" />
                    <span className="text-xs text-white/35">{c.roof_color_label}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="pb-6 mb-6 border-b border-white/8">
                  <div className="text-xs text-white/30 uppercase tracking-wide mb-1">{c.price_label}</div>
                  <div className="font-display text-4xl font-light text-brand-white">{c.price_value}</div>
                  <div className="text-xs text-white/30 mt-1">{c.price_note}</div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <Button href="mailto:ctn.marco@hotmail.it" fullWidth size="lg">
                    <Icon name="mail" size={16} />
                    {c.cta_email}
                  </Button>
                  <Button variant="ghost" href="tel:+393926449095" fullWidth size="lg">
                    <Icon name="phone" size={16} />
                    {c.cta_phone}
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
