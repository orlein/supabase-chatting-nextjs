'use client';

import ChannelMessageList from '@/app/(inside)/c/[id]/ChannelMessageList';
import useMessageListener from '@/features/messageSlice/useMessageListener';

type SingleChannelPageProps = {
  params: { id: number };
};

export default function SingleChannelPage(props: SingleChannelPageProps) {
  useMessageListener({ channel_id: props.params.id });

  return (
    <>
      <ChannelMessageList channel_id={props.params.id} />
    </>
  );
}
