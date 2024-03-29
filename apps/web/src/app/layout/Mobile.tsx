import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, AppBar, Box } from '@mui/material';
import AppToolbarMobile from './AppToolbarMobile';
import MobileNavigationSidebar from './MobileNavigationSidebar';

const Mobile = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box
        component="main" 
        sx={{
          p: 2,
          height: 'calc(100vh - 56px)'
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
