import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-red text-white hover:bg-brand-red-bright border border-brand-red hover:border-brand-red-bright shadow-lg shadow-brand-red/20',
  ghost:
    'bg-transparent text-brand-white border border-white/20 hover:border-brand-red/50 hover:text-white',
  outline:
    'bg-transparent text-brand-red border border-brand-red/50 hover:border-brand-red hover:bg-brand-red/10',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  onClick,
  children,
  className,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

  if (href) {
    return <a href={href} className={base}>{children}</a>;
  }
  return <button type="button" onClick={onClick} className={base}>{children}</button>;
}
