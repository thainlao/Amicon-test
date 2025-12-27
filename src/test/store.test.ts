import { describe, test, expect } from 'vitest';
import { store } from '../app/providers/store';

describe('store', () => {
  test('store имеет правильные редьюсеры', () => {
    expect(store.getState()).toHaveProperty('auth');
    expect(store.getState()).toHaveProperty('game');
    expect(store.getState()).toHaveProperty('history');
  });

  test('useAppSelector типизирован', () => {
    const state = store.getState();
    expect(state.auth).toHaveProperty('playerX');
    expect(state.game).toHaveProperty('board');
  });
});
