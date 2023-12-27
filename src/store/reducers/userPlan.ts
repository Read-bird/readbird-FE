import { ERecordStatus, TPlan, TPlanData, TPlanRecord, TPreviouslyFailedPlan } from '@api/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { convertObject } from '@utils/function';
import dayjs from 'dayjs';

type TState = {
  weedRecord: Record<string, TPlanRecord>;
  planData: TPlan[];
  previouslyFailedPlan: TPreviouslyFailedPlan[];
  currentDate: string;
  monthCurrentDate: string;
  monthRecord: Record<string, TPlanRecord>;
  recordTrophy: number;
  planTrophy: number;
};

const initialState: TState = {
  weedRecord: {},
  planData: [],
  previouslyFailedPlan: [],
  currentDate: dayjs().format(),
  monthCurrentDate: dayjs().format(),
  monthRecord: {},
  recordTrophy: 0,
  planTrophy: 0
};

const planSlice = createSlice({
  name: 'userPlan',
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<TPlanData>) => {
      const { weedRecord, planData, previouslyFailedPlan } = action.payload;
      state.weedRecord = convertObject(weedRecord, 'date');
      state.planData = planData;
      state.previouslyFailedPlan = previouslyFailedPlan;
    },
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    setMonthCurrentDate: (state, action: PayloadAction<string>) => {
      state.monthCurrentDate = action.payload;
    },
    setPlanEndData: (state, action: PayloadAction<{ planId: number; endDate: string }>) => {
      state.planData = state.planData.map((plan) => {
        if (plan.planId === action.payload.planId) {
          return { ...plan, endDate: action.payload.endDate };
        }
        return plan;
      });
    },
    addPlanData: (state, action: PayloadAction<TPlan>) => {
      state.planData.push(action.payload);
    },
    deletePlanData: (state, action: PayloadAction<number>) => {
      state.planData = state.planData.filter((plan) => plan.planId !== action.payload);
    },
    setMonthRecord: (state, action: PayloadAction<TPlanRecord[]>) => {
      state.monthRecord = convertObject(action.payload, 'date');
    },
    setTrophy: (state, action: PayloadAction<{ recordTrophy: number; planTrophy: number }>) => {
      state.recordTrophy = action.payload.recordTrophy;
      state.planTrophy = action.payload.planTrophy;
    },
    setRecordStatus: (
      state,
      action: PayloadAction<{ planId: number; recordStatus: ERecordStatus }>
    ) => {
      state.planData = state.planData.map((plan) => {
        if (plan.planId === action.payload.planId) {
          return { ...plan, recordStatus: action.payload.recordStatus };
        }
        return plan;
      });
    },
    addFailedPlan: (state, action: PayloadAction<TPreviouslyFailedPlan>) => {
      state.previouslyFailedPlan.push(action.payload);
    }
  }
});

export const {
  setPlan,
  setCurrentDate,
  setMonthCurrentDate,
  setPlanEndData,
  addPlanData,
  deletePlanData,
  setMonthRecord,
  setTrophy,
  setRecordStatus,
  addFailedPlan
} = planSlice.actions;

export const planStore = planSlice.reducer;
