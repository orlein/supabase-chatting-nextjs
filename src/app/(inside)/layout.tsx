import ChannelList from '@/common/components/ChannelList';
import styles from './InsideLayout.module.css';

export default function InsideLayout(props: React.PropsWithChildren) {
  return (
    <main className={styles.main}>
      <section className={styles.leftNavSection} aria-label="left nav bar">
        <ChannelList />
      </section>
      <section className={styles.userZone} aria-label="user zone">
        {props.children}
      </section>
    </main>
  );
}
