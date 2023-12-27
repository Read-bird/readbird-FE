import { TResponseCollection } from '@api/types/collection';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TCollection = Omit<TResponseCollection, 'characterId'> & { characterId: number | null };

type TState = {
  collections: TCollection[];
  selectCollection: TResponseCollection | null;
};

const COLLECT_SIZE = 18;

const initialState: TState = {
  collections: new Array(COLLECT_SIZE)
    .fill(null)
    .map(() => ({ characterId: null, name: '???', content: '', imageUrl: '', getDate: '' })),
  selectCollection: null
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
    setSelectCollection: (state, action: PayloadAction<TResponseCollection>) => {
      state.selectCollection = action.payload;
    }
  }
});

export const { setCollections, setSelectCollection } = collectionSlice.actions;

export const collectionStore = collectionSlice.reducer;
