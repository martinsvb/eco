import { Dispatch, SetStateAction, memo, useCallback } from 'react';
import { Drawer, Toolbar } from '@mui/material';
import AppNavigation from './AppNavigation';

const drawerWidth = 240;

interface MobileNavigationSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNavigationSidebar = ({
  open,
  setOpen
}: MobileNavigationSidebarProps) => {

  const handleClose = useCallback(
    (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
      setOpen(false);
    },
    []
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box'
        },
      }}
    >
      <AppNavigation />
      <Toolbar />
    </Drawer>
  );
}

export default memo(MobileNavigationSidebar);
