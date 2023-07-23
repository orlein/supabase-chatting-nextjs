'use client';

import {
  asyncSetChannelThunk,
  selectChannel,
} from '@/features/channelSlice/channelSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

export default function ChannelList() {
  const { channels } = useAppSelector(selectChannel);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Channel List</h1>
      <button
        onClick={() => {
          dispatch(asyncSetChannelThunk({}));
        }}
      >
        fetch channel
      </button>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>{channel.slug}</li>
        ))}
      </ul>
    </div>
  );
}
