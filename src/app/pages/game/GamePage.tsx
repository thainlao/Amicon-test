import type { ReactElement } from 'react';
import { useAppSelector } from '../../../app/providers/store';
import { Card } from '../../shared/ui/Card';
import { GameBoard } from '../../features/game/GameBoard';
import { GameControls } from '../../features/game/GameControlls';

export const GamePage: React.FC = (): ReactElement => {
  const { playerX, playerO } = useAppSelector((s) => s.auth);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_minmax(220px,260px)]">
      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-sm text-slate-300">
            <span>
              X: <strong>{playerX || 'Unknown'}</strong>
            </span>
            <span>
              O: <strong>{playerO || 'Unknown'}</strong>
            </span>
          </div>
          <GameBoard />
          <GameControls />
        </div>
      </Card>
      <Card>
        <h2 className="font-semibold mb-2 text-white">Правила</h2>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>Бесконечная сетка, но видимое окно ограничено..</li>
          <li>Игроки размещают крестики и нолики в любой свободной клетке..</li>
          <li>Победитель тот, кто набирает 5 в ряд</li>
          <li>Можно сбросить или сохранить.</li>
        </ul>
      </Card>
    </div>
  );
};
