import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, Toolbar, Box, List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { routes } from '@eco/config';
import { selectIsUserLoggedIn, useShallowEqualSelector } from '@eco/redux';

const drawerWidth = 240;

interface NavItemProps {
  icon: ReactNode;
  text: string;
  to: string;
}

const NavItem = ({icon, text, to}: NavItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText>
        <Link to={to}>{text}</Link>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export const LeftSidebar = () => {

  const isUserLoggedIn = useShallowEqualSelector(selectIsUserLoggedIn);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <NavItem
            icon={<HomeIcon />}
            text="Home"
            to={`${routes.base}${routes.home}`}
          />
          {isUserLoggedIn
            ?
            <NavItem
              icon={<AccountBalanceWalletIcon />}
              text="Accounts"
              to={`${routes.base}${routes.accounts}`}
            />
            :
            null
          }
        </List>
      </Box>
    </Drawer>
  );
}

export default LeftSidebar;
