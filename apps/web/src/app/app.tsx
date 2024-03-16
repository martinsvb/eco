import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LeftSidebar from './layout/LeftSidebar';
import Header from './layout/Header';
import Content from './layout/Content';

export default () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline enableColorScheme />
      <Header />
      <LeftSidebar />
      <Content />
    </Box>
  );
}
