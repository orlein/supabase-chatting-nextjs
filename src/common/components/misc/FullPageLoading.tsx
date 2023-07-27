import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

export default function FullPageLoading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        top: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
