'use client';

import SingleChannelMessage from '@/app/(inside)/c/[id]/SingleChannelMessage';
import useAuthSlice from '@/features/authSlice/useAuthSlice';
import useMessageSlice from '@/features/messageSlice/useMessageSlice';
import { useRouter } from 'next/navigation';
import styles from './ChannelMessageList.module.css';

type ChannelMessageListProps = {
  channel_id: number;
};
export default function ChannelMessageList(props: ChannelMessageListProps) {
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

  const {
    authState: { isAdmin, isModerator },
  } = useAuthSlice();

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <button onClick={() => router.back()}>back</button>
      <p>{error}</p>
      <h1>Channel Message List</h1>
      <div className={styles.list}>
        {channelMessages.map((message) => (
          <SingleChannelMessage
            key={message.id}
            {...message}
            isDeleteEnabled={isAdmin || isModerator}
          />
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={handleChangeNewMessage}
        onKeyDown={handleEnterCreateNewMessage}
      />
      <button onClick={handleClickCreateNewMessage}>add message</button>
    </div>
  );
}
