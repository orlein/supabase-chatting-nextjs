import { MessageWithAuthor } from '@/features/messageSlice/messageSlice';
import styles from './SingleChannelMessage.module.css';

type SingleChannelMessageProps = MessageWithAuthor;

export default function SingleChannelMessage(props: SingleChannelMessageProps) {
  return (
    <div className={styles.container}>
      <h6>{props.author.username}</h6>
      <p>{props.message}</p>
      <p>{props.inserted_at}</p>
      <button>remove</button>
    </div>
  );
}
