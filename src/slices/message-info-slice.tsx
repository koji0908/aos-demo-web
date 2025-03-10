import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MessageInfo = {
  success: string;
  infos: Array<string>;
  warnings: Array<string>;
  errors: Array<string>;
  validationErrors: Array<string>;
};

export interface MessageInfoState {
  messageInfo: MessageInfo;
}

const doClearMessages = (state: any) => {
  state.messageInfo = {
    success: '',
    infos: [],
    warnings: [],
    errors: [],
    validationErrors: [],
  };
};

const doSetSuccess = (state: any, action: PayloadAction<string>) => {
  state.messageInfo.success = action.payload;
};

const doSetInfos = (state: any, action: PayloadAction<Array<string>>) => {
  state.messageInfo.infos = action.payload;
};

const doSetWarnings = (state: any, action: PayloadAction<Array<string>>) => {
  state.messageInfo.warnings = action.payload;
};

const doSetErrors = (state: any, action: PayloadAction<Array<string>>) => {
  state.messageInfo.errors = action.payload;
};

const doSetValidationErrors = (state: any, action: PayloadAction<Array<string>>) => {
  state.messageInfo.validationErrors = action.payload;
};

const messageInfoSlice = createSlice({
  name: 'messageInfo',
  initialState: {
    messageInfo: {
      success: '',
      infos: [],
      warnings: [],
      errors: [],
      validationErrors: [],
    },
  } as MessageInfoState,
  reducers: {
    clearMessages: doClearMessages,
    setSuccess: doSetSuccess,
    setInfos: doSetInfos,
    setWarnings: doSetWarnings,
    setErrors: doSetErrors,
    setValidationErrors: doSetValidationErrors,
  },
});

export const { clearMessages, setSuccess, setInfos, setWarnings, setErrors, setValidationErrors } =
  messageInfoSlice.actions;
export const messageInfoReducer = messageInfoSlice.reducer;
