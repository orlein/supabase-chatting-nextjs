import { emailRegex } from '@/common/utils/format';
import {
  asyncLoginThunk,
  asyncSignOutThunk,
  asyncSignUpThunk,
  selectAuth,
  setSessionAction,
} from '@/features/authSlice/authSlice';
import { listenAuthSession } from '@/features/authSlice/authSocket';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import React from 'react';

export type NewAuthState = {
  login: {
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
  login: {
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
    changeNewAuthLoginEmail: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) {
        state.login.error = 'Email must not be empty';
        return;
      }

      if (!emailRegex.test(action.payload)) {
        state.login.error = 'Email format is invalid';
        return;
      }

      state.login.email = action.payload;
    },
    changeNewAuthLoginPassword: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) {
        state.login.error = 'Password must not be empty';
        return;
      }

      state.login.password = action.payload;
    },
    changeNewAuthSignUpEmail: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) {
        state.login.error = 'Email must not be empty';
        return;
      }

      if (!emailRegex.test(action.payload)) {
        state.login.error = 'Email format is invalid';
        return;
      }

      state.login.email = action.payload;
    },
    changeNewAuthSignUpPassword: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) {
        state.login.error = 'Password must not be empty';
        return;
      }

      state.login.password = action.payload;
    },
    resetNewAuthLogin: (state) => {
      state.login = initialNewAuthState.login;
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

  React.useEffect(() => {
    const sub = listenAuthSession((_event, session) => {
      dispatch(setSessionAction(session));
    });

    return () => {
      sub.unsubscribe();
    };
  }, [dispatch]);

  const handleChangeNewAuthLoginEmail: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((event) => {
      dispatchNewAuth(
        newAuthSlice.actions.changeNewAuthLoginEmail(event.target.value)
      );
    }, []);

  const handleChangeNewAuthLoginPassword: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((event) => {
      dispatchNewAuth(
        newAuthSlice.actions.changeNewAuthLoginPassword(event.target.value)
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

  const handleLogin = React.useCallback(async () => {
    await dispatch(asyncLoginThunk(newAuthState.login));
    dispatchNewAuth(newAuthSlice.actions.resetNewAuthLogin());
    router.push('/');
  }, [dispatch, newAuthState.login, router]);

  const handleSignUp = React.useCallback(async () => {
    await dispatch(asyncSignUpThunk(newAuthState.signUp));
    dispatchNewAuth(newAuthSlice.actions.resetNewAuthSignUp());
    router.refresh();
  }, [dispatch, newAuthState.signUp, router]);

  const handleSignOut = React.useCallback(async () => {
    await dispatch(asyncSignOutThunk());
    dispatchNewAuth(newAuthSlice.actions.resetNewAuthLogin());
    dispatchNewAuth(newAuthSlice.actions.resetNewAuthSignUp());
    router.replace('/login');
  }, [dispatch, router]);

  const handleKeyEnterLogin: React.KeyboardEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        if (event.key === 'Enter') {
          handleLogin();
        }
      },
      [handleLogin]
    );

  const handleKeyEnterSignUp: React.KeyboardEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        if (event.key === 'Enter') {
          handleSignUp();
        }
      },
      [handleSignUp]
    );

  return {
    authState: {
      ...state,
      isLogin: Boolean(state.session),
      handleLogin,
      handleSignUp,
      handleSignOut,
    },
    loginState: {
      ...newAuthState.login,
      handleChangeNewAuthLoginEmail,
      handleChangeNewAuthLoginPassword,
      handleKeyEnterLogin,
    },
    signUpState: {
      ...newAuthState.signUp,
      handleChangeNewAuthSignUpEmail,
      handleChangeNewAuthSignUpPassword,
      handleKeyEnterSignUp,
    },
  };
}
