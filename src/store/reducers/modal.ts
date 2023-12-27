import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TState = {
  isOpen: boolean;
  openType: number;
};

const initialState: TState = {
  isOpen: false,
  openType: 4
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setOpenType: (state, action: PayloadAction<number>) => {
      state.openType = action.payload;
    }
  }
});

export const { setOpen, setOpenType } = modalSlice.actions;

export const modalStore = modalSlice.reducer;
