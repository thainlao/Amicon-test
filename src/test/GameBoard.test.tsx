import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { GameBoard } from '../app/features/game/GameBoard';
import { store } from '../app/providers/store';

describe('GameBoard', () => {
  beforeEach(() => {
    store.dispatch({ type: 'game/resetGame' });
  });

  test('отображает статус текущего игрока', () => {
    render(<Provider store={store}><GameBoard /></Provider>);
    expect(screen.getByTestId('current-player')).toHaveTextContent('X');
  });

  test('рендерит сетку 21x21', () => {
    render(<Provider store={store}><GameBoard /></Provider>);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(441);
  });

  test('диспатчит makeMove при клике', () => {
    render(<Provider store={store}><GameBoard /></Provider>);
    const firstButton = screen.getAllByRole('button')[220];
    fireEvent.click(firstButton);
    expect(store.getState().game.board['0,0']).toBe('X');
  });
});
