import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
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
            <NavItem
              icon={<LoginIcon />}
              text="Login"
              to={`${routes.base}${routes.login}`}
            />
          }
        </List>
      </Box>
    </Drawer>
  );
}

export default LeftSidebar;
