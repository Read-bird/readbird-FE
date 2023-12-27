import {
  bookDetailStore,
  bookSearchStore,
  collectionStore,
  loadingStore,
  modalStore,
  planStore,
  userStore
} from '@/store/reducers';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    userStore: userStore,
    planStore: planStore,
    bookSearchStore: bookSearchStore,
    bookDetailStore: bookDetailStore,
    loadingStore: loadingStore,
    collectionStore: collectionStore,
    modalStore: modalStore
  }
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
