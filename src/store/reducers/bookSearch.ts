import { TBookDetail, TSearchBooksResult } from '@api/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TBook = Omit<TBookDetail, 'totalPage'> & { totalPage: number };

export type TBookData = Omit<TSearchBooksResult, 'bookList'> & { bookList: TBook[] };

type TState = {
  bookList: TBook[];
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
    addBookList(state, action: PayloadAction<TBook[]>) {
      state.bookList.push(...action.payload);
    },
    setBookList(state, action: PayloadAction<TBook[]>) {
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
