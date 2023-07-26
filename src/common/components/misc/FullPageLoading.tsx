import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

export default function FullPageLoading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
