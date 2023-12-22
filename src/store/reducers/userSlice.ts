import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUserState {
  accessToken: string;
  userName: string;
  userId: number | null;
}

const initialState: IUserState = {
  accessToken: localStorage.getItem('rb-access-token') ?? '',
  userName: '',
  userId: null
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    }
  }
});

export const { setAccessToken, setUserName, setUserId } = userSlice.actions;

export const userStore = userSlice.reducer;
