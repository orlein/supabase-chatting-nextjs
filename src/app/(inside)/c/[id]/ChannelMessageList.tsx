'use client';

import SingleChannelMessage from '@/app/(inside)/c/[id]/SingleChannelMessage';
import useAuthSlice from '@/features/authSlice/useAuthSlice';
import useMessageSlice from '@/features/messageSlice/useMessageSlice';
import Box from '@mui/material/Box';
import React from 'react';

type ChannelMessageListProps = {
  channel_id: number;
};
export default function ChannelMessageList(props: ChannelMessageListProps) {
  const {
    messageState: { channelMessages },
  } = useMessageSlice(props);

  const {
    authState: { isAdmin, isModerator },
  } = useAuthSlice();

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: 'instant', block: 'end' });
  }, [channelMessages.length]);

  return (
    <>
      <Box
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          padding: 10,
        }}
      >
        {channelMessages.map((message) => (
          <SingleChannelMessage
            key={message.id}
            {...message}
            isDeleteEnabled={isAdmin || isModerator}
          />
        ))}
      </Box>
      <Box sx={{ height: 64 }} ref={ref} />
    </>
  );
}
