'use client';
import FullPageLoading from '@/common/components/misc/FullPageLoading';
import useAuthSlice from '@/features/authSlice/useAuthSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import NextLink from 'next/link';

export default function SignUpPage() {
  const {
    signUpState,
    authState: { handleSignUp, loading, error },
  } = useAuthSlice();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(
      (event) => {
        event.preventDefault();
        handleSignUp();
      },
      [handleSignUp]
    );

  if (loading) {
    return <FullPageLoading />;
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          flex: 1,
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={signUpState.handleChangeNewAuthSignUpEmail}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={signUpState.handleChangeNewAuthSignUpPassword}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
      {signUpState.error && (
        <Typography variant="caption" color="error">
          {signUpState.error}
        </Typography>
      )}
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
      <Link href="/sign-in" variant="body2" component={NextLink}>
        {'Already have an account? Sign in'}
      </Link>
    </Box>
  );
}
