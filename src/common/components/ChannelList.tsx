'use client';

import useChannelListener from '@/features/channelSlice/useChannelListener';
import useChannelSlice from '@/features/channelSlice/useChannelSlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

export type ChannelListProps = {
  open: boolean;
};

export default function ChannelList(props: ChannelListProps) {
  useChannelListener();
  const { channelState } = useChannelSlice();

  return (
    <List>
      {channelState.channels.map((channel) => (
        <ListItem key={channel.id} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: props.open ? 'initial' : 'center',
              px: 2.5,
            }}
            LinkComponent={Link}
            href={`/c/${channel.id}`}
          >
            <ListItemText
              primary={channel.slug}
              sx={{ opacity: props.open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
