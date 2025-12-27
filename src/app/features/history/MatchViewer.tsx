import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../../../app/providers/store';
import type { PlayerSymbol } from '../../entities/player/types';
import { Card } from '../../shared/ui/Card';
import { makeKey } from '../game/checkWinner';
import { Button } from '../../shared/ui/Button';

export interface MatchViewerProps {
  matchId: string | null;
}

interface ViewerBoard {
  board: Record<string, PlayerSymbol>;
  maxStep: number;
}

export const MatchViewer: React.FC<MatchViewerProps> = ({ matchId }): ReactElement => {
  const matches = useAppSelector((s) => s.history.matches);
  const [step, setStep] = useState<number | null>(null);

  const match = matches.find((m) => m.id === matchId) ?? null;

  const { board, maxStep }: ViewerBoard = useMemo(() => {
    if (!match) return { board: {}, maxStep: 0 };
    const map: Record<string, PlayerSymbol> = {};
    const limit = step ?? match.moves.length;
    for (const move of match.moves) {
      if (move.id > limit) break;
      map[makeKey(move.x, move.y)] = move.player;
    }
    return { board: map, maxStep: match.moves.length };
  }, [match, step]);

  if (!match) {
    return (
      <Card>
        <p className="text-sm text-slate-300">Выберите матч.</p>
      </Card>
    );
  }

  const xs = match.moves.map((m) => m.x);
  const ys = match.moves.map((m) => m.y);
  const minX = Math.min(...xs) - 2;
  const maxX = Math.max(...xs) + 2;
  const minY = Math.min(...ys) - 2;
  const maxY = Math.max(...ys) + 2;

  const cols: number[] = [];
  for (let x = minX; x <= maxX; x += 1) cols.push(x);
  const rows: number[] = [];
  for (let y = maxY; y >= minY; y -= 1) rows.push(y);

  const currentStep = step ?? match.moves.length;

  const toStart = (): void => setStep(1);
  const toPrev = (): void =>
    setStep((s) => (s == null ? match.moves.length - 1 : Math.max(1, s - 1)));
  const toNext = (): void =>
    setStep((s) =>
      s == null ? match.moves.length : Math.min(match.moves.length, (s ?? 1) + 1),
    );
  const toEnd = (): void => setStep(null);

  return (
    <Card>
      <div className="flex justify-between items-center mb-3 text-sm">
        <div>
          <div className="font-medium text-white">
            {match.playerX} (X) против {match.playerO} (O)
          </div>
          <div className="text-slate-400">
            {new Date(match.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="text-xs text-emerald-400">
          {match.winner === 'draw' ? 'Ничья' : `Победитель: ${match.winner}`}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3 text-xs">
        <Button variant="ghost" onClick={toStart} disabled={currentStep <= 1}>
          « Начать
        </Button>
        <Button variant="ghost" onClick={toPrev} disabled={currentStep <= 1}>
          ‹ Предыдущий
        </Button>
        <span className="text-slate-300">
          Шаг {currentStep} / {maxStep}
        </span>
        <Button variant="ghost" onClick={toNext} disabled={currentStep >= maxStep}>
          След ›
        </Button>
        <Button variant="ghost" onClick={toEnd} disabled={currentStep >= maxStep}>
          Конец »
        </Button>
      </div>

      <div className="border border-slate-700 rounded-lg max-h-[360px] overflow-auto bg-slate-900">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols.length}, minmax(18px, 24px))`,
          }}
        >
          {rows.map((y) =>
            cols.map((x) => {
              const key = makeKey(x, y);
              const value = board[key];
              return (
                <div
                  key={key}
                  className="w-6 h-6 border border-slate-800 flex items-center justify-center text-sm"
                >
                  {value}
                </div>
              );
            }),
          )}
        </div>
      </div>
    </Card>
  );
};
