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
        sx={{
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Box
          component="main"
          sx={{
            height: 'calc(100vh - 64px)',
            p: 2,
            overflowY: 'auto',
            ...getScrollbarDesign({
              trackColor: palette.background.default,
              thumbColor: palette.grey[500],
            })
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Desktop;
