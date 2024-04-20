import { Box, Divider, Typography } from '@mui/material';
import { Countries } from './Countries';

export const Home = () => {

  return (
    <Box>
      <Typography variant='h2' mb={1}>Home</Typography>
      <Divider />
      <Typography variant='body1' mt={2}>Welcome in eco app!</Typography>
      <Countries />
    </Box>
  );
};
