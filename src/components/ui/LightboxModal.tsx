import { useEffect, useCallback, useRef } from 'react';
import type { MediaItem } from '../../content/index';

interface LightboxModalProps {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function LightboxModal({ items, currentIndex, onClose, onPrev, onNext }: LightboxModalProps) {
  const current = items[currentIndex];
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Pause previous video when navigating
  useEffect(() => {
    videoRef.current?.load();
  }, [currentIndex]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-xl"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm bg-black/40 px-3 py-1 rounded-full">
        {currentIndex + 1} / {items.length}
      </div>

      {/* Prev button */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors text-2xl"
          aria-label="Previous"
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors text-2xl"
          aria-label="Next"
        >
          ›
        </button>
      )}

      {/* Media content */}
      <div
        className="relative max-w-[88vw] max-h-[88vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {current.type === 'image' ? (
          <img
            key={current.src}
            src={current.src}
            alt={current.alt ?? ''}
            className="max-w-[88vw] max-h-[88vh] object-contain rounded-lg shadow-2xl"
            draggable={false}
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <video
              ref={videoRef}
              key={current.src}
              src={current.src}
              controls
              autoPlay
              className="max-w-[88vw] max-h-[80vh] rounded-lg shadow-2xl"
            />
            {current.label && (
              <span className="text-white/60 text-sm">{current.label}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
