import ChannelMessageList from '@/app/c/[id]/ChannelMessageList';
import useAuthGuard from '@/hooks/useAuthGuard';

type SingleChannelPageProps = {
  params: { id: number };
};

export default async function SingleChannelPage(props: SingleChannelPageProps) {
  useAuthGuard();

  return (
    <div>
      <ChannelMessageList channel_id={props.params.id} />
    </div>
  );
}
