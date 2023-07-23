'use client';

import useChannelSlice from '@/features/channelSlice/useChannelSlice';

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
