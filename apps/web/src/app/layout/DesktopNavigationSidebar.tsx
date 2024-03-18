import { Drawer, Toolbar } from '@mui/material';
import AppNavigation from './AppNavigation';

const drawerWidth = 240;

export const DesktopNavigationSidebar = () => {

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box'
        },
      }}
    >
      <Toolbar />
      <AppNavigation />
    </Drawer>
  );
}

export default DesktopNavigationSidebar;
