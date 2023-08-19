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
  const readMessagesFlag = React.useRef(false);
  const subscriberFlag = React.useRef(false);

  // https://react.dev/learn/you-might-not-need-an-effect#fetching-data
  React.useEffect(() => {
    if (readMessagesFlag.current) {
      return;
    }
    readMessagesFlag.current = false;
    dispatch(asyncReadMessagesThunk({ channel_id: props.channel_id }));

    return () => {
      readMessagesFlag.current = true;
    };
  }, [dispatch, props.channel_id]);

  React.useEffect(() => {
    if (subscriberFlag.current) {
      return;
    }
    subscriberFlag.current = false;

    const sub = listenMessage(
      (payload) => {
        dispatch(
          createMessageAction({
            channel_id: payload.channel_id,
            message: payload,
          })
        );
      },
      (payload) => {
        dispatch(
          updateMessageAction({
            channel_id: payload.channel_id,
            message: payload,
          })
        );
      },
      (payload) => {
        dispatch(
          deleteMessageAction({
            channel_id: payload.channel_id,
            message_id: payload.id,
          })
        );
      }
    ).subscribe();

    return () => {
      sub.unsubscribe();
      subscriberFlag.current = true;
    };
  }, [dispatch, props.channel_id]);
}
