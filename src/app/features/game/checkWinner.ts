import type { CellKey } from "../../entities/match/types";
import type { PlayerSymbol } from "../../entities/player/types";


const directions: Array<[dx: number, dy: number]> = [
  [1, 0], // горизонталь
  [0, 1], // вертикаль
  [1, 1], // диагональ \
  [1, -1], // диагональ /
];

export const makeKey = (x: number, y: number): CellKey => `${x},${y}`;

export const parseKey = (key: CellKey): [number, number] => {
  const [x, y] = key.split(',').map(Number);
  return [x, y];
};

export const checkWinner = (
  map: Record<CellKey, PlayerSymbol>,
  lastX: number,
  lastY: number,
  player: PlayerSymbol,
  required = 5,
): boolean => {
  for (const [dx, dy] of directions) {
    let count = 1;

    // вперёд
    let x = lastX + dx;
    let y = lastY + dy;
    while (map[makeKey(x, y)] === player) {
      count += 1;
      x += dx;
      y += dy;
    }

    // назад
    x = lastX - dx;
    y = lastY - dy;
    while (map[makeKey(x, y)] === player) {
      count += 1;
      x -= dx;
      y -= dy;
    }

    if (count >= required) return true;
  }
  return false;
};
