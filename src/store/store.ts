import { configureStore } from "@reduxjs/toolkit";
import userStore from "./reducers/userSlice";

export const store = configureStore({
    reducer: {
        userStore: userStore,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
