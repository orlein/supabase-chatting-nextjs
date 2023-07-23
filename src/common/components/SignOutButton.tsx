'use client';

import useAuthSlice from '@/features/authSlice/useAuthSlice';

export default function SignOutButton() {
  const {
    authState: { handleSignOut },
  } = useAuthSlice();
  return <button onClick={handleSignOut}>Sign Out</button>;
}
