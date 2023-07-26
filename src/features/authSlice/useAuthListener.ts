import { setSessionAction } from '@/features/authSlice/authSlice';
import { listenAuthSession } from '@/features/authSlice/authSocket';
import useAppDispatch from '@/hooks/useAppDispatch';
import React from 'react';

// Listener should be called only once per channel.
export default function useAuthListener() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const sub = listenAuthSession((_event, session) => {
      dispatch(setSessionAction(session));
    });

    return () => {
      sub.unsubscribe();
    };
  }, [dispatch]);
}
