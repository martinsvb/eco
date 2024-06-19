import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Box, Toolbar, useTheme } from '@mui/material';
import { getScrollbarDesign } from '@eco/config';
import { apiGetAuthUser, useAppDispatch } from '@eco/redux';
import AppToolbar from './AppToolbar';
import DesktopNavigationSidebar from './DesktopNavigationSidebar';

const Desktop = () => {

  const { palette, zIndex } = useTheme();

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch(apiGetAuthUser(''));
    },
    [dispatch]
  );

  return (
    <Box sx={{ display: 'flex' }}>
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
            py: 2,
            px: 4,
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
