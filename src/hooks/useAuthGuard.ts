import { readUserAuth } from '@/features/authSlice/authApi';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function useAuthGuard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isLogin, setIsLogin] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    readUserAuth().then((data) => {
      setIsLogin(!!data);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (!isLoading && !isLogin) {
      router.push('/login');
    }
  }, [isLoading, isLogin, router]);
}
