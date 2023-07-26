import Providers from '@/common/wrappers/Providers';
import './styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ThemeRegistry from '@/common/ThemeRegistry/ThemeRegistry';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        <ThemeRegistry>
          <Providers>{props.children}</Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
