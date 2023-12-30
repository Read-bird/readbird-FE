import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TState = {
  loading: boolean;
};

const initialState: TState = {
  loading: false
};

const loadingState = createSlice({
  name: 'loadingStore',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { setLoading } = loadingState.actions;

export const loadingStore = loadingState.reducer;
