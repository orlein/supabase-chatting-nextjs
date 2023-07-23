'use client';

import useMessageSlice from '@/features/messageSlice/useMessageSlice';
import useAuthGuard from '@/hooks/useAuthGuard';
import { useRouter } from 'next/navigation';

type ChannelMessageListProps = {
  channel_id: number;
};
export default function ChannelMessageList(props: ChannelMessageListProps) {
  useAuthGuard();
  const router = useRouter();
  const {
    messageState: { channelMessages, error },
    newMessageState: {
      message,
      handleChangeNewMessage,
      handleEnterCreateNewMessage,
      handleClickCreateNewMessage,
    },
  } = useMessageSlice(props);
  return (
    <div>
      <button onClick={() => router.back()}>back</button>
      <p>{error}</p>
      <h1>Channel Message List</h1>
      <input
        type="text"
        value={message}
        onChange={handleChangeNewMessage}
        onKeyDown={handleEnterCreateNewMessage}
      />
      <button onClick={handleClickCreateNewMessage}>add message</button>
      {channelMessages.map((message) => (
        <div key={message.id}>
          <p>{message.message}</p>
          <button>remove</button>
        </div>
      ))}
    </div>
  );
}
