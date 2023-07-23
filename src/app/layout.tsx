import Providers from '@/common/wrappers/Providers';
import './styles/globals.css';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="ko">
        <body>
          <section>
            <header></header>
            <main>{props.children}</main>
          </section>
        </body>
      </html>
    </Providers>
  );
}
