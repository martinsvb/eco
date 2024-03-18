import { Outlet } from 'react-router-dom';
import { AppBar, Box, CssBaseline, Toolbar, useTheme } from '@mui/material';
import DesktopNavigationSidebar from './DesktopNavigationSidebar';
import AppToolbar from './AppToolbar';

const Desktop = () => {

  const { zIndex } = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline enableColorScheme />
      <AppBar
        position="fixed"
        sx={{
          zIndex: zIndex.drawer + 1
        }}
      >
        <AppToolbar />
      </AppBar>
      <DesktopNavigationSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Desktop;
