import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, AppBar, Box, useTheme, Toolbar } from '@mui/material';
import { getScrollbarDesign } from '@eco/config';
import AppToolbarMobile from './AppToolbarMobile';
import MobileNavigationSidebar from './MobileNavigationSidebar';

const Mobile = () => {

  const [open, setOpen] = useState(false);

  const { palette } = useTheme();

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Box
          component="main"
          sx={{
            height: 'calc(100vh - 56px)',
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
        <Toolbar />
      </Box>
      <MobileNavigationSidebar
        open={open}
        setOpen={setOpen}
      />
      <AppBar
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0
        }}
      >
        <AppToolbarMobile
          setOpen={setOpen}
        />
      </AppBar>
    </>
  );
}

export default Mobile;
