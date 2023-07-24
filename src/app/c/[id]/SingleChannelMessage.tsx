import { Message } from '@/features/messageSlice/messageSlice';
import styles from './SingleChannelMessage.module.css';

type SingleChannelMessageProps = Message;

export default function SingleChannelMessage(props: SingleChannelMessageProps) {
  return (
    <div className={styles.container}>
      <h6>{props.user_id}</h6>
      <p>{props.message}</p>
      <p>{props.inserted_at}</p>
      <button>remove</button>
    </div>
  );
}
