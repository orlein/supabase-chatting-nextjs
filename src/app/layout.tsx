import Providers from '@/common/wrappers/Providers';
import './styles/globals.css';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
