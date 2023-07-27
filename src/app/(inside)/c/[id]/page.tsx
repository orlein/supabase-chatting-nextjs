'use client';

import ChannelMessageList from '@/app/(inside)/c/[id]/ChannelMessageList';
import { DRAWER_WIDTH } from '@/common/components/layouts/Drawer';
import useMessageListener from '@/features/messageSlice/useMessageListener';
import useMessageSlice from '@/features/messageSlice/useMessageSlice';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React from 'react';
type SingleChannelPageProps = {
  params: { id: number };
};

export default function SingleChannelPage(props: SingleChannelPageProps) {
  useMessageListener({ channel_id: props.params.id });
  const {
    newMessageState: {
      message,
      handleChangeNewMessage,
      handleEnterCreateNewMessage,
      handleClickCreateNewMessage,
    },
  } = useMessageSlice({ channel_id: props.params.id });

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <>
      <ChannelMessageList channel_id={props.params.id} />
      <Box
        sx={(theme) => ({
          flexGrow: 1,
          bottom: 0,
          position: 'fixed',
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          backgroundColor: theme.palette.background.paper,
        })}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          inputRef={inputRef}
          value={message}
          onChange={handleChangeNewMessage}
          onKeyDown={handleEnterCreateNewMessage}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton aria-label="emoji" edge="start">
                  <EmojiEmotionsIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="send"
                  edge="end"
                  onClick={handleClickCreateNewMessage}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
}
