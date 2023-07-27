import {
  asyncCreateChannelThunk,
  selectChannel,
} from '@/features/channelSlice/channelSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import React from 'react';

export type NewChannelState = {
  name: string;
  error: string | null;
};

const initialNewChannelState: NewChannelState = {
  name: '',
  error: null,
};

const newChannelSlice = createSlice({
  name: 'newChannel',
  initialState: initialNewChannelState,
  reducers: {
    changeNewChannel: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) {
        state.error = 'Channel name must not be empty';
        return;
      }

      if (action.payload.length > 20) {
        state.error = 'Channel name must be less than 20 characters';
        return;
      }
      state.name = action.payload;
    },
    resetNewChannel: (state) => {
      state.name = '';
      state.error = null;
    },
  },
});

export default function useChannelSlice() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectChannel);

  const [newChannelState, dispatchNewChannel] = React.useReducer(
    newChannelSlice.reducer,
    initialNewChannelState
  );

  const handleChangeNewChannelName: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((e) => {
      dispatchNewChannel(
        newChannelSlice.actions.changeNewChannel(e.target.value)
      );
    }, []);

  const handleClickCreateChannel: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();
        dispatch(asyncCreateChannelThunk({ slug: newChannelState.name }));
        dispatchNewChannel(newChannelSlice.actions.resetNewChannel());
      },
      [dispatch, newChannelState.name]
    );

  const handleKeyEnterCreateChannel: React.KeyboardEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
          dispatch(asyncCreateChannelThunk({ slug: newChannelState.name }));
          dispatchNewChannel(newChannelSlice.actions.resetNewChannel());
        }
      },
      [dispatch, newChannelState.name]
    );

  return {
    channelState: {
      ...state,
      handleClickCreateChannel,
      handleKeyEnterCreateChannel,
    },
    newChannelState: {
      ...newChannelState,
      handleChangeNewChannelName,
    },
  };
}
