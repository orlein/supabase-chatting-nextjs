import {
  MessageWithAuthor,
  asyncDeleteMessageThunk,
} from '@/features/messageSlice/messageSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import React from 'react';
import ReactTimeAgo from 'react-timeago';
import styles from './SingleChannelMessage.module.css';

type SingleChannelMessageProps = MessageWithAuthor & {
  isDeleteEnabled: boolean;
};

export default function SingleChannelMessage(props: SingleChannelMessageProps) {
  const dispatch = useAppDispatch();

  const handleDeleteMessage: (
    message_id: number
  ) => React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (message_id) => (e) => {
      e.preventDefault();
      dispatch(
        asyncDeleteMessageThunk({
          channel_id: props.channel_id,
          message_id,
        })
      );
    },
    [dispatch, props.channel_id]
  );

  const handleClickDelete = React.useCallback(() => {
    handleDeleteMessage(props.id);
  }, [handleDeleteMessage, props.id]);

  return (
    <div className={styles.container}>
      <h6>{props.author.username}</h6>
      <p>{props.message}</p>
      <ReactTimeAgo date={new Date(props.inserted_at)} />
      {props.isDeleteEnabled && (
        <button onClick={handleClickDelete}>remove</button>
      )}
    </div>
  );
}
