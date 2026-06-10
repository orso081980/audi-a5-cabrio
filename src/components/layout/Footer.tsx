import { useContent } from '../../hooks/useContent';

export function Footer() {
  const footer = useContent('footer');

  return (
    <footer className="border-t border-white/8 bg-brand-black">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <span className="text-brand-red">◈</span>
          <span>{footer.tagline}</span>
        </div>
        <p className="text-white/30 text-xs text-center sm:text-right">
          {footer.legal}
        </p>
      </div>
    </footer>
  );
}
