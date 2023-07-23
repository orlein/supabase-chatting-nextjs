/* Core */
import middlewares from '@/features/redux/middleware';
import {
  configureStore,
  type Action,
  type ThunkAction,
  combineReducers,
} from '@reduxjs/toolkit';
import appConfigReducer from '@/features/appConfigSlice/appConfigSlice';
import channelReducer from '@/features/channelSlice/channelSlice';

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  channel: channelReducer,
});

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middlewares);
  },
});

/* Types */
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
