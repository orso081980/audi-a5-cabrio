import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { SectionHeading } from '../ui/SectionHeading';
import { useInView } from '../../hooks/useInView';
import { useContent } from '../../hooks/useContent';
import { LightboxModal } from '../ui/LightboxModal';
import type { MediaItem } from '../../content/index';

interface MediaThumbProps {
  item: MediaItem;
  index: number;
  onOpen: () => void;
}

function MediaThumb({ item, index, onOpen }: MediaThumbProps) {
  const [ref, visible] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onClick={onOpen}
      className={[
        'relative aspect-video rounded-xl overflow-hidden border border-white/10',
        'hover:border-brand-red/40 transition-all duration-300 group cursor-pointer',
        'bg-brand-surface hover:shadow-lg hover:shadow-brand-red/5',
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
      ].join(' ')}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      {item.type === 'image' ? (
        <>
          <img
            src={item.src}
            alt={item.alt ?? ''}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Icon name="image" size={18} className="text-white" />
            </div>
          </div>
        </>
      ) : (
        <>
          <video
            src={item.src}
            className="w-full h-full object-cover"
            muted
            preload="metadata"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-brand-red/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Icon name="play" size={20} className="text-white ml-0.5" />
            </div>
          </div>
          {item.label && (
            <div className="absolute bottom-2 left-2 right-2">
              <span className="text-xs text-white/80 bg-black/50 px-2 py-1 rounded">
                {item.label}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function Gallery() {
  const [ref, visible] = useInView<HTMLDivElement>();
  const gallery = useContent('gallery');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = gallery.media ?? [];

  return (
    <section id="gallery" className="py-24 bg-brand-deep">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {items.map((item, i) => (
            <MediaThumb
              key={item.src}
              item={item}
              index={i}
              onOpen={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <LightboxModal
          items={items}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
          onNext={() => setLightboxIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : prev))}
        />
      )}
    </section>
  );
}
