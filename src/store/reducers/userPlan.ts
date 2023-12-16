import { TPlan, TPlanRecord, TPreviouslyFailedPlan } from '@api/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TPlanData = {
  weekRecord: TPlanRecord[] | null;
  planData: TPlan[] | null;
  previouslyFailedPlan: TPreviouslyFailedPlan[] | null;
  currentDate: Date;
};

const initialState: TPlanData = {
  weekRecord: null,
  planData: null,
  previouslyFailedPlan: null,
  currentDate: new Date()
};

const planSlice = createSlice({
  name: 'userPlan',
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<TPlanData>) => {
      const { weekRecord, planData, previouslyFailedPlan } = action.payload;
      state.weekRecord = weekRecord;
      state.planData = planData;
      state.previouslyFailedPlan = previouslyFailedPlan;
    },
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = new Date(action.payload);
    }
  }
});

export const { setPlan, setCurrentDate } = planSlice.actions;

export const planStore = planSlice.reducer;
