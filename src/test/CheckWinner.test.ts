import { checkWinner, makeKey, parseKey } from "../app/features/game/checkWinner";


describe('checkWinner', () => {
  test('makeKey/parseKey работают корректно', () => {
    expect(makeKey(1, 2)).toBe('1,2');
    expect(parseKey('1,2')).toEqual([1, 2]);
  });

  test('не определяет победу без 5 в ряд', () => {
    const board: Record<string, 'X' | 'O'> = {};
    expect(checkWinner(board, 0, 0, 'X')).toBe(false);
  });

  test('определяет горизонтальную победу X', () => {
    const board: Record<string, 'X' | 'O'> = {
      '0,0': 'X', '1,0': 'X', '2,0': 'X', '3,0': 'X', '4,0': 'X',
    };
    expect(checkWinner(board, 2, 0, 'X')).toBe(true);
  });

  test('определяет вертикальную победу O', () => {
    const board: Record<string, 'X' | 'O'> = {
      '0,0': 'O', '0,1': 'O', '0,2': 'O', '0,3': 'O', '0,4': 'O',
    };
    expect(checkWinner(board, 0, 2, 'O')).toBe(true);
  });

  test('определяет диагональную победу \\', () => {
    const board: Record<string, 'X' | 'O'> = {
      '0,4': 'X', '1,3': 'X', '2,2': 'X', '3,1': 'X', '4,0': 'X',
    };
    expect(checkWinner(board, 2, 2, 'X')).toBe(true);
  });

  test('определяет диагональную победу /', () => {
    const board: Record<string, 'X' | 'O'> = {
      '0,0': 'X', '1,1': 'X', '2,2': 'X', '3,3': 'X', '4,4': 'X',
    };
    expect(checkWinner(board, 2, 2, 'X')).toBe(true);
  });
});
