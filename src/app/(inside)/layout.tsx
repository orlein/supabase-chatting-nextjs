import ChannelList from '@/common/components/ChannelList';

export default function InsideLayout(props: React.PropsWithChildren) {
  return (
    <div>
      <ChannelList />
      {props.children}
    </div>
  );
}
