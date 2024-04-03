import { Outlet } from 'react-router-dom';
import { AppBar, Box, CssBaseline, Toolbar, useTheme } from '@mui/material';
import DesktopNavigationSidebar from './DesktopNavigationSidebar';
import AppToolbar from './AppToolbar';
import { getScrollbarDesign } from '@eco/config';

const Desktop = () => {

  const { palette, zIndex } = useTheme();

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
      <Box
        component="main"
        sx={{
          height: '100vh',
          flexGrow: 1,
          p: 2,
          overflowY: 'auto',
          ...getScrollbarDesign({
            trackColor: palette.background.default,
            thumbColor: palette.getContrastText(palette.background.default),
          }),
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Desktop;
