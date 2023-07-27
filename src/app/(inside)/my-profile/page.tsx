'use client';

import useAuthSlice from '@/features/authSlice/useAuthSlice';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

export default function MyPageProfile() {
  const {
    authState: { session, userRole, loading },
  } = useAuthSlice();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <TextField
        disabled
        label="Email"
        value={session?.user.email}
        sx={{ mt: 1, width: '100%' }}
      />
      <TextField
        disabled
        label="Role"
        value={userRole}
        sx={{ mt: 1, width: '100%' }}
      />
      <TextField
        disabled
        label="Phone"
        value={session?.user.phone}
        sx={{ mt: 1, width: '100%' }}
      />
      <TextField
        disabled
        label="Created At"
        value={session?.user.created_at}
        sx={{ mt: 1, width: '100%' }}
      />
    </Box>
  );
}
