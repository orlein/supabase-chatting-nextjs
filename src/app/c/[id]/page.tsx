import ChannelMessageList from '@/app/c/[id]/ChannelMessageList';
import serverSideAuth from '@/backend/serverSideAuth';

type SingleChannelPageProps = {
  params: { id: number };
};

export default async function SingleChannelPage(props: SingleChannelPageProps) {
  await serverSideAuth();

  return (
    <div>
      <ChannelMessageList channel_id={props.params.id} />
    </div>
  );
}
