import { ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Box, List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { routes } from '@eco/config';
import { selectIsUserLoggedIn, useAppSelector } from '@eco/redux';

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

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(
    () => {
      if (isUserLoggedIn) {
        navigate(`${routes.base}${routes.accounts}`);
      }
    },
    [isUserLoggedIn, navigate]
  );

  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {isUserLoggedIn
          ?
          <NavItem
            icon={<AccountBalanceWalletIcon />}
            text={t('accounts')}
            to={`${routes.base}${routes.accounts}`}
          />
          :
          <NavItem
            icon={<HomeIcon />}
            text={t('home')}
            to={`${routes.base}${routes.home}`}
          />
        }
      </List>
    </Box>
  );
}

export default AppNavigation;
