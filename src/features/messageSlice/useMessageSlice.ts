import {
  asyncCreateMessageThunk,
  selectMessage,
} from '@/features/messageSlice/messageSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import React from 'react';

export type NewMessageState = {
  message: string;
};

const initialNewMessageState: NewMessageState = {
  message: '',
};

const newMessageSlice = createSlice({
  name: 'newMessage',
  initialState: initialNewMessageState,
  reducers: {
    changeNewMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    resetNewMessage: (state) => {
      state.message = '';
    },
  },
});

export default function useMessageSlice(props: { channel_id: number }) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectMessage);

  const [newMessageState, dispatchNewMessage] = React.useReducer(
    newMessageSlice.reducer,
    initialNewMessageState
  );

  const handleChangeNewMessage: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((e) => {
      dispatchNewMessage(
        newMessageSlice.actions.changeNewMessage(e.target.value)
      );
    }, []);

  const handleClickCreateNewMessage: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();
        dispatch(
          asyncCreateMessageThunk({
            channel_id: props.channel_id,
            message: newMessageState.message,
          })
        );
        dispatchNewMessage(newMessageSlice.actions.resetNewMessage());
      },
      [dispatch, newMessageState.message, props.channel_id]
    );
  const handleEnterCreateNewMessage: React.KeyboardEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
          dispatch(
            asyncCreateMessageThunk({
              channel_id: props.channel_id,
              message: newMessageState.message,
            })
          );
          dispatchNewMessage(newMessageSlice.actions.resetNewMessage());
        }
      },
      [dispatch, newMessageState.message, props.channel_id]
    );

  const channelMessages = React.useMemo(
    () => state.messages[props.channel_id] ?? [],
    [props.channel_id, state.messages]
  );

  return {
    newMessageState: {
      ...newMessageState,
      handleChangeNewMessage,
      handleClickCreateNewMessage,
      handleEnterCreateNewMessage,
    },
    messageState: {
      channelMessages,
      ...state,
    },
  };
}
