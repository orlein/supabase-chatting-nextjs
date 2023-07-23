'use client';

import useChannelSlice from '@/features/channelSlice/useChannelSlice';
import Link from 'next/link';

export default function ChannelList() {
  const { channelState } = useChannelSlice();

  return (
    <div>
      <h1>Channel List</h1>
      <button>fetch channel</button>
      <ul>
        {channelState.channels.map((channel) => (
          <li key={channel.id}>
            <Link href={`/c/${channel.id}`}>{channel.slug}</Link>
            <button>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
