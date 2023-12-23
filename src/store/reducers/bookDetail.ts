import { TBook } from '@/store/reducers/bookSearch';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const bookDetailSlice = createSlice({
  name: 'bookDetail',
  initialState: null as TBook | null,
  reducers: {
    setBookDetail: (state: TBook | null, action: PayloadAction<TBook | null>) => {
      return action.payload;
    }
  }
});

export const { setBookDetail } = bookDetailSlice.actions;

export const bookDetailStore = bookDetailSlice.reducer;
