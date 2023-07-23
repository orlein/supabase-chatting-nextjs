import {
  LoginParams,
  SignUpParams,
  login,
  signOut,
  signUp,
} from '@/features/authSlice/authApi';
import createAppAsyncThunk from '@/features/redux/createAppAsyncThunk';
import { RootState } from '@/redux/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Session } from '@supabase/auth-helpers-nextjs';

export type AuthState = {
  session: Session | null;
  loading: boolean;
  error: string | null;
};

const initialAuthState: AuthState = {
  session: null,
  loading: false,
  error: null,
};

export const asyncLoginThunk = createAppAsyncThunk(
  'auth/asyncLoginThunk',
  async (params: LoginParams) => {
    const data = await login(params);
    return data;
  }
);

export const asyncSignUpThunk = createAppAsyncThunk(
  'auth/asyncSignUpThunk',
  async (params: SignUpParams) => {
    const data = await signUp(params);
    return data;
  }
);

export const asyncSignOutThunk = createAppAsyncThunk(
  'auth/asyncSignOutThunk',
  async () => {
    await signOut();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setSessionAction: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLoginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.session = action.payload.session;
    });
    builder.addCase(asyncSignUpThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.session = action.payload.session;
    });
    builder.addCase(asyncSignOutThunk.fulfilled, (state) => {
      state.loading = false;
      state.session = null;
    });
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/fulfilled'),
      (state) => {
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/pending'),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error occurred';
      }
    );
  },
});

export const { setSessionAction } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
