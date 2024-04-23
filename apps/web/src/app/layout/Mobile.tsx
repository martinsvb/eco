import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, AppBar, Box, useTheme, Toolbar } from '@mui/material';
import { getScrollbarDesign } from '@eco/config';
import { useAppDispatch, apiGetAuthUser } from '@eco/redux';
import AppToolbarMobile from './AppToolbarMobile';
import MobileNavigationSidebar from './MobileNavigationSidebar';

const Mobile = () => {

  const [open, setOpen] = useState(false);

  const { palette, zIndex } = useTheme();

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch(apiGetAuthUser(''));
    },
    []
  );

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box
        component="main"
        sx={{
          height: 'calc(100vh - 56px)',
          flexGrow: 1,
          p: 2,
          overflowY: 'auto',
          ...getScrollbarDesign({
            trackColor: palette.background.default,
            thumbColor: palette.grey[500],
          })
        }}
      >
        <Outlet />
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
          bottom: 0,
          zIndex: zIndex.drawer + 1
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
