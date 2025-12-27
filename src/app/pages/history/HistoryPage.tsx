import type { ReactElement } from 'react';
import { useState } from 'react';
import { HistoryList } from '../../features/history/HistoryList';
import { MatchViewer } from '../../features/history/MatchViewer';


export const HistoryPage: React.FC = (): ReactElement => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <HistoryList onSelect={setSelectedId} />
      <MatchViewer matchId={selectedId} />
    </div>
  );
};
