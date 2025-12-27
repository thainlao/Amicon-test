import type { ReactNode } from 'react';

export const Card = ({ children }: { children: ReactNode }) => (
  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-lg">
    {children}
  </div>
);
