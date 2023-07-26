'use client';
import MiniDrawer from '@/common/components/layouts/MiniDrawer';
import useAuthListener from '@/features/authSlice/useAuthListener';
import useAuthGuard from '@/hooks/useAuthGuard';

export default function InsideLayout(props: React.PropsWithChildren) {
  useAuthListener();
  useAuthGuard();

  return <MiniDrawer>{props.children}</MiniDrawer>;
}
