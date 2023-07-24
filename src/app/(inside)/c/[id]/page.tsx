'use client';

import ChannelMessageList from '@/app/(inside)/c/[id]/ChannelMessageList';
import useAuthGuard from '@/hooks/useAuthGuard';

type SingleChannelPageProps = {
  params: { id: number };
};

export default function SingleChannelPage(props: SingleChannelPageProps) {
  useAuthGuard();

  return (
    <div>
      <ChannelMessageList channel_id={props.params.id} />
    </div>
  );
}
