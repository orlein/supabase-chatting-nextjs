import styles from './OutsideLayout.module.css';

export default function OutsideLayout(props: React.PropsWithChildren) {
  return (
    <section className={styles.container}>
      <main className={styles.main}>{props.children}</main>
    </section>
  );
}
