import { RootState } from '@/redux/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AppConfigState = {
  theme: string;
};

const initialLangState: AppConfigState = {
  theme: 'normal',
};

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState: initialLangState,
  reducers: {
    setTheme: (state, action: PayloadAction<AppConfigState['theme']>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = appConfigSlice.actions;

export const selectAppConfig = (state: RootState) => state.appConfig;

export default appConfigSlice.reducer;
