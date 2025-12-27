import type { ReactElement, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../providers/store';
import { Layout } from '../shared/ui/Layout';
import { LoginPage } from '../pages/login/LoginPage';
import { GamePage } from '../pages/game/GamePage';
import { HistoryPage } from '../pages/history/HistoryPage';

interface RequirePlayersProps {
  children: ReactNode;
}

const RequirePlayers: React.FC<RequirePlayersProps> = ({ children }): ReactElement => {
  const p1 = useAppSelector((s) => s.auth.playerX);
  const p2 = useAppSelector((s) => s.auth.playerO);
  if (!p1 || !p2) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export const AppRouter: React.FC = (): ReactElement => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/game"
          element={
            <RequirePlayers>
              <GamePage />
            </RequirePlayers>
          }
        />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
