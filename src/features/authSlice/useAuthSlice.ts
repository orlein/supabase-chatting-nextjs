import { emailRegex } from '@/common/utils/format';
import {
  asyncSignInThunk,
  asyncSignOutThunk,
  asyncSignUpThunk,
  selectAuth,
} from '@/features/authSlice/authSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import React from 'react';

export type NewAuthState = {
  signIn: {
    email: string;
    password: string;
    error: string | null;
  };
  signUp: {
    email: string;
    password: string;
    error: string | null;
  };
};

const initialNewAuthState: NewAuthState = {
  signIn: {
    email: '',
    password: '',
    error: null,
  },
  signUp: {
    email: '',
    password: '',
    error: null,
  },
};

const newAuthSlice = createSlice({
  name: 'newAuth',
  initialState: initialNewAuthState,
  reducers: {
    changeNewAuthSignInEmail: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) {
        state.signIn.error = 'Email must not be empty';
        return;
      }

      if (!emailRegex.test(action.payload)) {
        state.signIn.error = 'Email format is invalid';
        return;
      }

      state.signIn.email = action.payload;
      state.signIn.error = null;
    },
    changeNewAuthSignInPassword: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) {
        state.signIn.error = 'Password must not be empty';
        return;
      }

      state.signIn.password = action.payload;
    },
    changeNewAuthSignUpEmail: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) {
        state.signUp.error = 'Email must not be empty';
        return;
      }

      if (!emailRegex.test(action.payload)) {
        state.signUp.error = 'Email format is invalid';
        return;
      }

      state.signUp.email = action.payload;
      state.signUp.error = null;
    },
    changeNewAuthSignUpPassword: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) {
        state.signUp.error = 'Password must not be empty';
        return;
      }

      state.signUp.password = action.payload;
    },
    resetNewAuthSignIn: (state) => {
      state.signIn = initialNewAuthState.signIn;
    },
    resetNewAuthSignUp: (state) => {
      state.signUp = initialNewAuthState.signUp;
    },
  },
});

export default function useAuthSlice() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAuth);
  const router = useRouter();

  const [newAuthState, dispatchNewAuth] = React.useReducer(
    newAuthSlice.reducer,
    initialNewAuthState
  );

  const handleChangeNewAuthSignInEmail: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((event) => {
      dispatchNewAuth(
        newAuthSlice.actions.changeNewAuthSignInEmail(event.target.value)
      );
    }, []);

  const handleChangeNewAuthSignInPassword: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((event) => {
      dispatchNewAuth(
        newAuthSlice.actions.changeNewAuthSignInPassword(event.target.value)
      );
    }, []);

  const handleChangeNewAuthSignUpEmail: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((event) => {
      dispatchNewAuth(
        newAuthSlice.actions.changeNewAuthSignUpEmail(event.target.value)
      );
    }, []);

  const handleChangeNewAuthSignUpPassword: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((event) => {
      dispatchNewAuth(
        newAuthSlice.actions.changeNewAuthSignUpPassword(event.target.value)
      );
    }, []);

  const handleSignIn = React.useCallback(async () => {
    await dispatch(asyncSignInThunk(newAuthState.signIn));
    dispatchNewAuth(newAuthSlice.actions.resetNewAuthSignIn());
    router.push('/');
  }, [dispatch, newAuthState.signIn, router]);

  const handleSignUp = React.useCallback(async () => {
    await dispatch(asyncSignUpThunk(newAuthState.signUp));
    dispatchNewAuth(newAuthSlice.actions.resetNewAuthSignUp());
    router.push('/');
  }, [dispatch, newAuthState.signUp, router]);

  const handleSignOut = React.useCallback(async () => {
    await dispatch(asyncSignOutThunk());
    dispatchNewAuth(newAuthSlice.actions.resetNewAuthSignIn());
    dispatchNewAuth(newAuthSlice.actions.resetNewAuthSignUp());
    router.push('/sign-in');
  }, [dispatch, router]);

  return {
    authState: {
      ...state,
      isSignIn: Boolean(state.session),
      isAdmin: Boolean(state.userRole === 'admin'),
      isModerator: Boolean(state.userRole === 'moderator'),
      handleSignIn,
      handleSignUp,
      handleSignOut,
    },
    signInState: {
      ...newAuthState.signIn,
      handleChangeNewAuthSignInEmail,
      handleChangeNewAuthSignInPassword,
    },
    signUpState: {
      ...newAuthState.signUp,
      handleChangeNewAuthSignUpEmail,
      handleChangeNewAuthSignUpPassword,
    },
  };
}
