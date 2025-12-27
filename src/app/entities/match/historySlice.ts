import { createSlice, createAction } from '@reduxjs/toolkit';
import type { Match } from './types';

const STORAGE_KEY = 'tic-tac-toe-matches';

const loadInitial = (): Match[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Match[];
  } catch {
    return [];
  }
};

const saveMatches = (matches: Match[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
  } catch {
    // ignore
  }
};

interface HistoryState {
  matches: Match[];
}

const initialState: HistoryState = {
  matches: loadInitial(),
};

export const addMatch = createAction<Match>('history/addMatch');

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},          
  extraReducers: (builder) => {
    builder.addCase(addMatch, (state, action) => {
      state.matches.unshift(action.payload);
      saveMatches(state.matches);
    });
  },
});

export default historySlice.reducer;
