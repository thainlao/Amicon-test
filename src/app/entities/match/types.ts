import type { PlayerSymbol } from "../player/types";

export type CellKey = string; // "x,y"

export interface Move {
  id: number;
  player: PlayerSymbol;
  x: number;
  y: number;
}

export interface Match {
  id: string;
  createdAt: string;
  playerX: string;
  playerO: string;
  winner: PlayerSymbol | 'draw' | null;
  moves: Move[];
}
