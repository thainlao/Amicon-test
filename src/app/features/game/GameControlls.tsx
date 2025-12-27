import type { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/providers/store';
import { v4 as uuid } from 'uuid';
import { addMatch } from '../../entities/match/historySlice';
import { resetGame } from './gameSlice';
import { Button } from '../../shared/ui/Button';

export const GameControls: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { board, winner, moves } = useAppSelector((s) => s.game);
  const { playerX, playerO } = useAppSelector((s) => s.auth);

  const handleSaveMatch = (): void => {
    if (!moves.length) return;
    const match = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      playerX,
      playerO,
      winner: winner ?? 'draw',
      moves,
    };
    dispatch(addMatch(match));
  };

  return (
    <div className="flex gap-3">
      <Button onClick={() => dispatch(resetGame())} variant="ghost">
        Сбросить
      </Button>
      <Button onClick={handleSaveMatch} disabled={!moves.length}>
        Сохранить
      </Button>
      <span className="text-sm text-slate-400 self-center">
        Движения: {moves.length} · Клетки: {Object.keys(board).length}
      </span>
    </div>
  );
};
