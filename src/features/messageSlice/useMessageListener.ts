import {
  asyncReadMessagesThunk,
  createMessageAction,
  deleteMessageAction,
  updateMessageAction,
} from '@/features/messageSlice/messageSlice';
import { listenMessage } from '@/features/messageSlice/messageSocket';
import useAppDispatch from '@/hooks/useAppDispatch';
import React from 'react';

// Listener should be called only once per channel.
export default function useMessageListener(props: { channel_id: number }) {
  const dispatch = useAppDispatch();

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
    ).subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, [dispatch, props.channel_id]);
}
