'use client';

import useChannelSlice from '@/features/channelSlice/useChannelSlice';
import Link from 'next/link';
import styles from './ChannelList.module.css';
export type ChannelListProps = {
  isDeleteEnabled?: boolean;
};

export default function ChannelList(props: ChannelListProps) {
  const { channelState } = useChannelSlice();

  return (
    <nav className={styles.vertical}>
      <ul>
        {channelState.channels.map((channel) => (
          <li key={channel.id}>
            <Link href={`/c/${channel.id}`}>{channel.slug}</Link>
            {props.isDeleteEnabled && <button>delete</button>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
