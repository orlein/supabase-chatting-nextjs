'use client';

import { appStore } from '@/redux/store';
import { Provider } from 'react-redux';

export default function Providers(props: React.PropsWithChildren) {
  return <Provider store={appStore}>{props.children}</Provider>;
}
