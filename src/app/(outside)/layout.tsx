'use client';
import useAuthListener from '@/features/authSlice/useAuthListener';
import Container from '@mui/material/Container';

export default function OutsideLayout(props: React.PropsWithChildren) {
  useAuthListener();
  return <Container component={'main'}>{props.children}</Container>;
}
