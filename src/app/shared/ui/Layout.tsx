import type { PropsWithChildren, ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Footer } from './Footer';

export type LayoutProps = PropsWithChildren<unknown>;

export const Layout: React.FC<LayoutProps> = ({ children }): ReactElement => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-2 border-indigo-500/30 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl shadow-lg shadow-indigo-500/10 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-black text-2xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
            АМИКОН (тест)
          </Link>
          <nav className="flex gap-6 text-lg font-semibold">
            <Link
              to="/login"
              className={`px-3 py-2 rounded-xl transition-all ${
                pathname === '/login'
                  ? 'bg-indigo-500/20 border-2 border-indigo-400 text-indigo-300 shadow-neon-cyan'
                  : 'hover:bg-indigo-500/10 hover:border-indigo-400/50 border-2 border-transparent text-zinc-300'
              }`}
            >
              Вход
            </Link>
            <Link
              to="/game"
              className={`px-3 py-2 rounded-xl transition-all ${
                pathname === '/game'
                  ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 shadow-neon-purple'
                  : 'hover:bg-emerald-500/10 hover:border-emerald-400/50 border-2 border-transparent text-zinc-300'
              }`}
            >
              Игра
            </Link>
            <Link
              to="/history"
              className={`px-3 py-2 rounded-xl transition-all ${
                pathname === '/history'
                  ? 'bg-purple-500/20 border-2 border-purple-400 text-purple-300 shadow-neon-purple'
                  : 'hover:bg-purple-500/10 hover:border-purple-400/50 border-2 border-transparent text-zinc-300'
              }`}
            >
              История
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-12">{children}</div>
      </main>
      
      <Footer>
        {/* Здесь твои кастомные ссылки */}
        <a href="/about" className="group hover:text-cyan-300 transition-colors">
          <span className="group-hover:underline">О проекте</span>
        </a>
      </Footer>
    </div>
  );
};
