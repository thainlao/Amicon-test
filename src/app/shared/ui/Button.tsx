import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...rest
}) => (
  <button
    type={rest.type ?? 'button'}
    className={clsx(
      'px-4 py-2 rounded-md font-semibold transition',
      variant === 'primary' &&
        'bg-indigo-500 hover:bg-indigo-400 text-white disabled:bg-slate-600',
      variant === 'ghost' &&
        'border border-slate-600 hover:bg-slate-800 text-slate-100',
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);
