import { createSlice } from '@reduxjs/toolkit';
import type { PlayerSymbol } from '../../entities/player/types';
import type { CellKey, Move } from '../../entities/match/types';
import { checkWinner, makeKey } from './checkWinner';
import { addMatch } from '../../entities/match/historySlice';

interface GameState {
  board: Record<CellKey, PlayerSymbol>;
  currentPlayer: PlayerSymbol;
  winner: PlayerSymbol | 'draw' | null;
  moves: Move[];
  nextMoveId: number;
}

const initialState: GameState = {
  board: {},
  currentPlayer: 'X',
  winner: null,
  moves: [],
  nextMoveId: 1,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGame(state) {
      Object.assign(state, initialState);
    },
    makeMove(state, action) {
      if (state.winner) return;
      const key = makeKey(action.payload.x, action.payload.y);
      if (state.board[key]) return;

      const player = state.currentPlayer;
      state.board[key] = player;

      const move: Move = {
        id: state.nextMoveId++,
        player,
        x: action.payload.x,
        y: action.payload.y,
      };
      state.moves.push(move);

      const isWin = checkWinner(state.board, move.x, move.y, player, 5);
      if (isWin) {
        state.winner = player;
      } else {
        state.currentPlayer = player === 'X' ? 'O' : 'X';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMatch, () => initialState);
  },
});

export const { resetGame, makeMove } = gameSlice.actions;
export default gameSlice.reducer;
