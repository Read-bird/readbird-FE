import { TResponseCollection } from '@api/types/collection';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TCollection = Omit<TResponseCollection, 'characterId'> & {
  characterId: number | null;
};

export type TSelectCollection = TResponseCollection & {
  title?: string;
  description?: string;
};

type TState = {
  collections: TCollection[];
  selectCollections: TSelectCollection[] | null;
};

const COLLECT_SIZE = 18;

const initialState: TState = {
  collections: new Array(COLLECT_SIZE)
    .fill(null)
    .map(() => ({ characterId: null, name: '???', content: '', imageUrl: '', getDate: '' })),
  selectCollections: null
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<TResponseCollection[]>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.collections[i] = action.payload[i];
      }
    },
    setSelectCollections: (state, action: PayloadAction<TSelectCollection[]>) => {
      state.selectCollections = action.payload;
    }
  }
});

export const { setCollections, setSelectCollections } = collectionSlice.actions;

export const collectionStore = collectionSlice.reducer;
