import Providers from '@/common/wrappers/Providers';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default async function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="ko">
      <head>
        <title>Chat App</title>
      </head>
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
