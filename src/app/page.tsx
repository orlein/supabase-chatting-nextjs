'use client';

import ChannelList from '@/common/components/ChannelList';
import SignOutButton from '@/common/components/SignOutButton';
import useAuthGuard from '@/hooks/useAuthGuard';

export default async function IndexPage() {
  useAuthGuard();

  return (
    <div>
      <ChannelList />
      <SignOutButton />
    </div>
  );
}
