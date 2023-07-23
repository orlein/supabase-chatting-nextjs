'use client';

import {
  asyncReadChannelsThunk,
  selectChannel,
} from '@/features/channelSlice/channelSlice';
import useChannelSlice from '@/features/channelSlice/useChannelSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

export default function ChannelList() {
  const { channelState } = useChannelSlice();

  return (
    <div>
      <h1>Channel List</h1>
      <button>fetch channel</button>
      <ul>
        {channelState.channels.map((channel) => (
          <li key={channel.id}>
            <p>{channel.slug}</p>
            <button>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
