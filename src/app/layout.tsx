import { Nav } from './components/Nav';

import Providers from '@/common/wrappers/Providers';
import './styles/globals.css';
import styles from './styles/layout.module.css';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="ko">
        <body>
          <section className={styles.container}>
            <Nav />
            <header className={styles.header}></header>
            <main className={styles.main}>{props.children}</main>
          </section>
        </body>
      </html>
    </Providers>
  );
}
