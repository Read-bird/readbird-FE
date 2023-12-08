import { userStore } from '@/store/reducers';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		userStore: userStore
	}
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
