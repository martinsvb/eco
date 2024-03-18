import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Box, List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { routes } from '@eco/config';
import { selectIsUserLoggedIn, useShallowEqualSelector } from '@eco/redux';

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

export const AppNavigation = () => {

  const isUserLoggedIn = useShallowEqualSelector(selectIsUserLoggedIn);

  return (
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
  );
}

export default AppNavigation;
