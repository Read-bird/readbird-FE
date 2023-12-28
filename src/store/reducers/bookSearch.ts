import { TBookDetail } from '@api/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TState = {
  bookList: TBookDetail[];
  totalPage: number;
};

const initialState: TState = {
  bookList: [],
  totalPage: 0
};

const boolSearchSlice = createSlice({
  name: 'bookSearch',
  initialState,
  reducers: {
    addBookList(state, action: PayloadAction<TBookDetail[]>) {
      state.bookList.push(...action.payload);
    },
    setBookList(state, action: PayloadAction<TBookDetail[]>) {
      state.bookList = action.payload;
    },
    setTotalPage(state, action: PayloadAction<number>) {
      state.totalPage = action.payload;
    },
    initBookList(state) {
      state.bookList = [];
    }
  }
});

export const { setBookList, addBookList, setTotalPage, initBookList } = boolSearchSlice.actions;

export const bookSearchStore = boolSearchSlice.reducer;
