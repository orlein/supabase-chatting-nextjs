import {
  asyncReadChannelsThunk,
  createChannelAction,
  deleteChannelAction,
  updateChannelAction,
} from '@/features/channelSlice/channelSlice';
import { listenChannel } from '@/features/channelSlice/channelSocket';
import useAppDispatch from '@/hooks/useAppDispatch';
import React from 'react';

// Listener should be called only once per channel.
export default function useChannelListener() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(asyncReadChannelsThunk({}));
  }, [dispatch]);

  React.useEffect(() => {
    const sub = listenChannel(
      (payload) => {
        dispatch(createChannelAction(payload));
      },
      (payload) => {
        dispatch(updateChannelAction(payload));
      },
      (payload) => {
        dispatch(deleteChannelAction(payload));
      }
    ).subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, [dispatch]);
}
