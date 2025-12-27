import type { FormEvent, ReactElement } from 'react';
import { useState } from 'react';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/providers/store';
import { setPlayers } from './authSlice';
import { Card } from '../../shared/ui/Card';


export const LoginForm: React.FC = (): ReactElement => {
  const [playerX, setPlayerX] = useState<string>('');
  const [playerO, setPlayerO] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!playerX.trim() || !playerO.trim()) return;
    dispatch(setPlayers({ playerX, playerO }));
    navigate('/game');
  };

  return (
    <Card>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-white">Новый матч</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Игрок 1"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
            placeholder="Введите имя"
          />
          <Input
            label="Игрок 2"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
            placeholder="Введите имя"
          />
        </div>
        <Button type="submit" className="self-end">
          Начать
        </Button>
      </form>
    </Card>
  );
};
