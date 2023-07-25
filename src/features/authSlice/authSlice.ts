import {
  LoginParams,
  SignUpParams,
  login,
  readUserRoles,
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
  userRole: 'admin' | 'moderator' | null;
};

const initialAuthState: AuthState = {
  session: null,
  loading: false,
  error: null,
  userRole: null,
};

export const asyncLoginThunk = createAppAsyncThunk(
  'auth/asyncLoginThunk',
  async (params: LoginParams, thunkAPI) => {
    const data = await login(params);
    thunkAPI.dispatch(asyncReadUserRoleThunk());
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

export const asyncReadUserRoleThunk = createAppAsyncThunk(
  'auth/asyncReadUserRoleThunk',
  async () => {
    const data = await readUserRoles();
    return data;
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
    builder.addCase(asyncReadUserRoleThunk.fulfilled, (state, action) => {
      state.loading = false;
      const userRoleIndex = action.payload.findIndex(
        (v) => v.user_id === state.session?.user.id
      );
      if (userRoleIndex > -1) {
        state.userRole = action.payload[userRoleIndex].role;
      }
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
        state.error = null;
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
