import type { ReactElement } from 'react';
import { useAppSelector } from '../../../app/providers/store';
import { Card } from '../../shared/ui/Card';


export interface HistoryListProps {
  onSelect: (id: string) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ onSelect }): ReactElement => {
  const matches = useAppSelector((s) => s.history.matches);

  if (!matches.length) {
    return (
      <Card>
        <p className="text-sm text-slate-300">Нет матчей.</p>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="font-semibold mb-3 text-white">Матчи</h2>
      <div className="flex flex-col gap-2 max-h-[360px] overflow-auto">
        {matches.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            className="flex justify-between items-center text-sm px-3 py-2 rounded-md hover:bg-slate-800 text-left"
          >
            <div>
              <div className="font-medium text-white">
                {m.playerX} (X) против {m.playerO} (O)
              </div>
              <div className="text-slate-400 text-xs">
                {new Date(m.createdAt).toLocaleString()}
              </div>
            </div>
            <span className="text-xs text-emerald-400">
              {m.winner === 'draw' ? 'Ничья' : `Победитель: ${m.winner}`}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
};
