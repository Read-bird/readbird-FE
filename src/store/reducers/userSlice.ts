import { createSlice } from '@reduxjs/toolkit'

interface userState {
    accessToken: string,
    userName: string
}

const initialState: userState = {
    accessToken: "",
    userName: ""
}

const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setUserName: (state, action) => {
            state.userName = action.payload
        },
    },
})

export const {
    setAccessToken,
    setUserName
} = userSlice.actions

export default userSlice.reducer;
