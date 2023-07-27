import {
  MessageWithAuthor,
  asyncDeleteMessageThunk,
} from '@/features/messageSlice/messageSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import ReactTimeAgo from 'react-timeago';

type SingleChannelMessageProps = MessageWithAuthor & {
  isDeleteEnabled: boolean;
};

export default function SingleChannelMessage(props: SingleChannelMessageProps) {
  const dispatch = useAppDispatch();

  const handleDeleteMessage: (
    message_id: number
  ) => React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (message_id) => (e) => {
      e.preventDefault();
      dispatch(
        asyncDeleteMessageThunk({
          channel_id: props.channel_id,
          message_id,
        })
      );
    },
    [dispatch, props.channel_id]
  );

  const handleClickDelete = React.useCallback(() => {
    handleDeleteMessage(props.id);
  }, [handleDeleteMessage, props.id]);

  const inserted_at = React.useMemo(() => {
    return new Date(props.inserted_at);
  }, [props.inserted_at]);

  return (
    <Stack spacing={2}>
      <Paper
        sx={{
          flexDirection: 'column',
          padding: 2,
          justifyContent: 'center',
        }}
      >
        <Chip label={props.author.username} />
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            marginLeft: 2,
            marginRight: 2,
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              padding: 2,
            }}
          >
            <Typography>{props.message}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="caption">
              <ReactTimeAgo date={inserted_at} />
            </Typography>
            <Typography variant="caption">
              {inserted_at.toLocaleString()}
            </Typography>
            {props.isDeleteEnabled && (
              <button onClick={handleClickDelete}>remove</button>
            )}
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
}
