import { TBookDetail, TSearchBooksResult } from '@api/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TBook = Omit<TBookDetail, 'totalPage'> & { totalPage: number };

export type TBookData = Omit<TSearchBooksResult, 'bookList'> & { bookList: TBook[] };


const initialState: TState = {
  bookList: [],
  page: 1,
  scale: 1,
  totalPage: 1,
  searchText: null,
  searchPage: 1,
  searchScale: 10
};

const boolSearchSlice = createSlice({
  name: 'bookSearch',
  initialState,
  reducers: {
    setBookData: (state, action: PayloadAction<TSearchBooksResult>) => {
      state.bookList = action.payload.bookList;
      state.page = action.payload.page;
      state.scale = action.payload.scale;
      state.totalPage = action.payload.totalPage;
    },
    setSearchData: (state, action: PayloadAction<TSearchData>) => {
      state.searchPage = action.payload.searchPage;
      state.searchScale = action.payload.searchScale ?? 10;
      state.searchText = action.payload.searchText;
    }
  }
});

export const { setBookData, setSearchData } = boolSearchSlice.actions;

export const bookSearchStore = boolSearchSlice.reducer;
