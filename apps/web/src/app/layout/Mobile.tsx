import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, AppBar, Box, useTheme } from '@mui/material';
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
        component="main" 
        sx={{
          p: 2,
          height: 'calc(100vh - 56px)',
          overflowY: 'auto',
          ...getScrollbarDesign({
            trackColor: palette.background.default,
            thumbColor: palette.grey[500],
          }),
        }}
      >
        <Outlet />
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
