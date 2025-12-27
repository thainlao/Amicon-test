import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  playerX: string;
  playerO: string;
}

const initialState: AuthState = {
  playerX: '',
  playerO: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPlayers(state, action) {
      state.playerX = action.payload.playerX.trim();
      state.playerO = action.payload.playerO.trim();
    },
    resetPlayers(state) {
      state.playerX = '';
      state.playerO = '';
    },
  },
});

export const { setPlayers, resetPlayers } = authSlice.actions;
export default authSlice.reducer;
