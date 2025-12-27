import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../app/providers/store';
import { LoginForm } from '../app/features/auth/LoginForm';

describe('LoginForm', () => {
  beforeEach(() => {
    // Сбрасываем состояние перед каждым тестом
    store.dispatch({ type: 'auth/resetPlayers' });
  });

  test('отображает форму с полями', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );
    
    // Проверяем лейблы на русском
    expect(screen.getByLabelText(/Игрок 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Игрок 2/i)).toBeInTheDocument();
    
    // Проверяем кнопку
    expect(screen.getByRole('button', { name: /Начать/i })).toBeInTheDocument();
    
    // Проверяем заголовок
    expect(screen.getByRole('heading', { name: /Новый матч/i })).toBeInTheDocument();
  });

  test('диспатчит setPlayers при успешной отправке', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );
    
    // Заполняем поля
    const player1Input = screen.getByLabelText(/Игрок 1/i);
    const player2Input = screen.getByLabelText(/Игрок 2/i);
    const submitButton = screen.getByRole('button', { name: /Начать/i });
    
    fireEvent.change(player1Input, { target: { value: 'Иван' } });
    fireEvent.change(player2Input, { target: { value: 'Пётр' } });
    
    // Отправляем форму
    fireEvent.click(submitButton);
    
    // Проверяем состояние Redux
    await waitFor(() => {
      const state = store.getState();
      expect(state.auth.playerX).toBe('Иван');
      expect(state.auth.playerO).toBe('Пётр');
    });
  });

  test('не отправляется с пустыми полями', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );
    
    const submitButton = screen.getByRole('button', { name: /Начать/i });
    fireEvent.click(submitButton);
    
    // Состояние не должно измениться
    const state = store.getState();
    expect(state.auth.playerX).toBe('');
    expect(state.auth.playerO).toBe('');
  });

  test('тримирует пробелы из имён', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );
    
    const player1Input = screen.getByLabelText(/Игрок 1/i);
    const player2Input = screen.getByLabelText(/Игрок 2/i);
    const submitButton = screen.getByRole('button', { name: /Начать/i });
    
    fireEvent.change(player1Input, { target: { value: '  Иван   ' } });
    fireEvent.change(player2Input, { target: { value: ' Пётр ' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const state = store.getState();
      expect(state.auth.playerX).toBe('Иван'); // пробелы убраны
      expect(state.auth.playerO).toBe('Пётр'); // пробелы убраны
    });
  });
});
