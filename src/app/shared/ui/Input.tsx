import type { InputHTMLAttributes, ReactElement } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, ...rest }): ReactElement => (
  <label className="flex flex-col gap-1 text-sm">
    {label && <span className="text-slate-300">{label}</span>}
    <input
      className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-100 outline-none focus:border-indigo-500"
      {...rest}
    />
  </label>
);
