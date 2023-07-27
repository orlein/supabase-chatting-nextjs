"use client";
import ThemeRegistry from "@/common/ThemeRegistry/ThemeRegistry";
import { appStore } from "@/redux/store";
import { Provider } from "react-redux";

export default function Providers(props: React.PropsWithChildren) {
  return (
    <ThemeRegistry>
      <Provider store={appStore}>{props.children}</Provider>
    </ThemeRegistry>
  );
}
