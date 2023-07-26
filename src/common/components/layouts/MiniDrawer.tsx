'use client';
import ChannelList from '@/common/components/ChannelList';
import AppBar from '@/common/components/layouts/AppBar';
import Drawer from '@/common/components/layouts/Drawer';
import DrawerHeader from '@/common/components/layouts/DrawerHeader';
import useAuthSlice from '@/features/authSlice/useAuthSlice';
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function MiniDrawer(props: React.PropsWithChildren) {
  const {
    authState: { isSignIn, handleSignOut },
  } = useAuthSlice();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMenu: React.MouseEventHandler<HTMLElement> = React.useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              marginRight: 5,
              ...{ display: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Chat App
          </Typography>
          {isSignIn && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open>
        <DrawerHeader />
        <Divider />
        <ChannelList open />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}
