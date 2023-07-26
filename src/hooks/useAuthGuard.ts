import { readUserAuth } from '@/features/authSlice/authApi';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function useAuthGuard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isSignIn, setIsSignIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    readUserAuth()
      .then((data) => {
        setIsSignIn(!!data);
      })
      .catch(() => {
        setIsSignIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    console.log({ isLoading }, { isSignIn });
    if (!isLoading && !isSignIn) {
      router.push('/sign-in');
    }
  }, [isLoading, isSignIn, router]);
}
