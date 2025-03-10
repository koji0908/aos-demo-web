import { createSlice } from '@reduxjs/toolkit';

export type ScreenInfo = {
  status: 'input' | 'confirm' | 'finish';
  mode: 'none' | 'regist' | 'update' | 'delete' | 'reference';
};

export interface ScreenInfoState {
  screenInfo: ScreenInfo;
}

const doSetScreenStatusInput = (state: any) => {
  state.status = 'input';
};

const doSetScreenStatusConfirm = (state: any) => {
  state.status = 'confirm';
};

const doSetScreenStatusFinish = (state: any) => {
  state.status = 'finish';
};

const doSetScreenModeNone = (state: any) => {
  state.mode = 'none';
};

const doSetScreenModeRegist = (state: any) => {
  state.mode = 'regist';
};

const doSetScreenModeUpdate = (state: any) => {
  state.mode = 'update';
};

const doSetScreenModeDelete = (state: any) => {
  state.mode = 'delete';
};

const doSetScreenModeReference = (state: any) => {
  state.mode = 'reference';
};

const screenInfoSlice = createSlice({
  name: 'screenInfo',
  initialState: {
    status: 'input',
    mode: 'none',
  } as ScreenInfo,
  reducers: {
    setScreenStatusInput: doSetScreenStatusInput,
    setScreenStatusConfirm: doSetScreenStatusConfirm,
    setScreenStatusFinish: doSetScreenStatusFinish,
    setScreenModeNone: doSetScreenModeNone,
    setScreenModeRegist: doSetScreenModeRegist,
    setScreenModeUpdate: doSetScreenModeUpdate,
    setScreenModeDelete: doSetScreenModeDelete,
    setScreenModeReference: doSetScreenModeReference,
  },
});

export const {
  setScreenStatusInput,
  setScreenStatusConfirm,
  setScreenStatusFinish,
  setScreenModeNone,
  setScreenModeUpdate,
  setScreenModeDelete,
  setScreenModeReference,
} = screenInfoSlice.actions;

export const screenInfoReducer = screenInfoSlice.reducer;
