import type { ReactElement } from 'react';
import { LoginForm } from '../../features/auth/LoginForm';

export const LoginPage: React.FC = (): ReactElement => (
  <div className="flex justify-center">
    <div className="w-full max-w-xl">
      <LoginForm />
    </div>
  </div>
);
