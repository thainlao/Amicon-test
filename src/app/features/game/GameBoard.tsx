import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/providers/store';
import { makeMove } from './gameSlice';
import { makeKey } from './checkWinner';

const RANGE = 10;

export const GameBoard: React.FC = (): ReactElement => {
  const board = useAppSelector((s) => s.game.board);
  const currentPlayer = useAppSelector((s) => s.game.currentPlayer);
  const winner = useAppSelector((s) => s.game.winner);
  const dispatch = useAppDispatch();

  const rows = useMemo<number[]>(() => {
    const arr: number[] = [];
    for (let y = RANGE; y >= -RANGE; y -= 1) arr.push(y);
    return arr;
  }, []);

  const cols = useMemo<number[]>(() => {
    const arr: number[] = [];
    for (let x = -RANGE; x <= RANGE; x += 1) arr.push(x);
    return arr;
  }, []);

  const handleCellClick = (x: number, y: number): void => {
    if (winner) return;
    dispatch(makeMove({ x, y }));
  };

  const getCellClass = (value: string | undefined, x: number, y: number) => {
    const base = "relative group border-2 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-neon cursor-pointer";
    
    if (value === 'X') {
      return `${base} bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400/50 text-cyan-300 shadow-neon-cyan backdrop-blur-sm`;
    }
    if (value === 'O') {
      return `${base} bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50 text-purple-300 shadow-neon-purple backdrop-blur-sm`;
    }
    
    return `${base} border-zinc-700/50 hover:border-indigo-400/80 hover:bg-indigo-500/10 shadow-neon-hover`;
  };

  return (
    <div className="border-2 border-indigo-500/50 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl shadow-indigo-500/25">
      {/* Header с градиентом */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border-b-2 border-indigo-500/30 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" />
            <span 
              data-testid="current-player"
              className="text-lg font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Ход: {currentPlayer}
            </span>
          </div>
          {winner && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/50 rounded-xl backdrop-blur-sm">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" />
              <span className="text-lg font-bold text-emerald-300">Победитель: {winner}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Координатная сетка */}
      <div className="max-h-[500px] overflow-auto p-4 bg-gradient-to-b from-slate-900/50 to-slate-900/90">
        <div
          className="grid relative"
          style={{
            gridTemplateColumns: `repeat(${cols.length}, minmax(28px, 36px))`,
            gridTemplateRows: `repeat(${rows.length}, minmax(28px, 36px))`,
          }}
        >
          {/* Координаты осей */}
          {cols.map((x, i) => (
            <div
              key={`col-${x}`}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-mono text-zinc-400 select-none pointer-events-none"
              style={{ left: `calc(${i * (100 / cols.length)}% + ${14}px)` }}
            >
              {x}
            </div>
          ))}
          {rows.slice(0, 5).map((y, i) => (
            <div
              key={`row-${y}`}
              className="absolute -left-10 top-1/2 transform -translate-y-1/2 text-xs font-mono text-zinc-400 select-none pointer-events-none rotate-90"
              style={{ top: `calc(${i * 20}% + ${20}px)` }}
            >
              {y}
            </div>
          ))}
          
          {/* Игровые клетки */}
          {rows.map((y) =>
            cols.map((x) => {
              const key = makeKey(x, y);
              const value = board[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleCellClick(x, y)}
                  className={getCellClass(value, x, y)}
                  disabled={!!winner}
                >
                  {value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-xl font-black drop-shadow-neon">
                        {value}
                      </div>
                    </div>
                  )}
                  {/* Hover эффект */}
                  {!value && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-indigo-400 to-purple-400 blur rounded-[6px] shadow-inner" />
                  )}
                </button>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
};
