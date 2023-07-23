import serverSideAuth from '@/backend/serverSideAuth';
import ChannelList from '@/common/components/ChannelList';
import SignOutButton from '@/common/components/SignOutButton';

export default async function IndexPage() {
  await serverSideAuth();

  return (
    <div>
      <ChannelList />
      <SignOutButton />
    </div>
  );
}

export const metadata = {
  title: 'Main: Chat App',
};
