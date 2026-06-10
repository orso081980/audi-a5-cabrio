import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, centered = false, light = false }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center')}>
      <span className={cn(
        'inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-3',
        light ? 'text-white/50' : 'text-brand-red'
      )}>
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl md:text-5xl font-light text-brand-white leading-tight">
        {title}
      </h2>
      <div className={cn(
        'mt-4 h-px w-16 bg-brand-red',
        centered && 'mx-auto'
      )} />
    </div>
  );
}
