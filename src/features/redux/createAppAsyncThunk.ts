import { AppDispatch, RootState } from '@/redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
/**
 * ? A utility function to create a typed Async Thunk Actions.
 */
const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

export default createAppAsyncThunk;
