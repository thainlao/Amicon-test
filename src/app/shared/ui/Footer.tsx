import type { ReactElement, ReactNode } from 'react';

export interface FooterProps {
  children?: ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ children }): ReactElement => (
  <footer className="border-t-2 border-indigo-500/30 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl">
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between text-sm text-zinc-400">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-lg">
            Бесконечные крестики нолики
          </span>
          <span>Носко Александр</span>
        </div>
        
        <nav className="flex flex-wrap gap-6 justify-center md:justify-end">
          <a href="https://github.com/thainlao/Amicon-test" target="_blank" rel="noopener noreferrer" className="group hover:text-indigo-300 transition-colors">
            <span className="group-hover:underline">GitHub</span>
          </a>
          <a href="https://t.me/thainlaod" target="_blank" rel="noopener noreferrer" className="group hover:text-purple-300 transition-colors">
            <span className="group-hover:underline">telegram</span>
          </a>
          <a href="https://hh.ru/resume/e36657c0ff0c0963660039ed1f6f354d496153" className="group hover:text-emerald-300 transition-colors">
            <span className="group-hover:underline">HH</span>
          </a>
        </nav>
      </div>
    </div>
  </footer>
);
