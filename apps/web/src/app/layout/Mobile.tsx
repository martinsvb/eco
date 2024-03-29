import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, AppBar, Box } from '@mui/material';
import AppToolbar from './AppToolbar';
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
          pb: 50
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
        <AppToolbar
          isMobile
          setOpen={setOpen}
        />
      </AppBar>
    </>
  );
}

export default Mobile;
