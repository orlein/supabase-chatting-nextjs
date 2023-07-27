import ThemeRegistry from "@/common/ThemeRegistry/ThemeRegistry";
import Providers from "@/common/wrappers/Providers";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="ko">
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
