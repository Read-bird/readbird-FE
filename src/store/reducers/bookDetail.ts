import { TBookDetail } from '@api/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const bookDetailSlice = createSlice({
  name: 'bookDetail',
  initialState: null as TBookDetail | null,
  reducers: {
    setBookDetail: (_, action: PayloadAction<TBookDetail | null>) => {
      return action.payload;
    }
  }
});

export const { setBookDetail } = bookDetailSlice.actions;

export const bookDetailStore = bookDetailSlice.reducer;
