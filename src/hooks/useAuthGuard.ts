import useAuthSlice from '@/features/authSlice/useAuthSlice';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function useAuthGuard() {
  const router = useRouter();
  const {
    authState: { isLogin },
  } = useAuthSlice();

  React.useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin, router]);
}
