import {
  asyncCreateMessageThunk,
  asyncReadMessagesThunk,
  createMessageAction,
  deleteMessageAction,
  selectMessage,
  updateMessageAction,
} from '@/features/messageSlice/messageSlice';
import { listenMessage } from '@/features/messageSlice/messageSocket';
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

  React.useEffect(() => {
    dispatch(asyncReadMessagesThunk({ channel_id: props.channel_id }));
  }, [dispatch, props.channel_id]);

  React.useEffect(() => {
    const sub = listenMessage(
      (payload) => {
        dispatch(
          createMessageAction({
            channel_id: props.channel_id,
            message: payload,
          })
        );
      },
      (payload) => {
        dispatch(
          updateMessageAction({
            channel_id: props.channel_id,
            message: payload,
          })
        );
      },
      (payload) => {
        dispatch(
          deleteMessageAction({
            channel_id: props.channel_id,
            message_id: payload.id,
          })
        );
      }
    );

    return () => {
      sub.unsubscribe();
    };
  }, [dispatch, props.channel_id]);

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
        if (e.key === 'Enter') {
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
