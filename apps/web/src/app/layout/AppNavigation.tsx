import { ReactNode, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Box, List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
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

  const location = useLocation();

  useEffect(
    () => {
      if (isUserLoggedIn && [routes.base, routes.home].includes(location.pathname)) {
        navigate(routes.content.task.list);
      }
    },
    [isUserLoggedIn, navigate, location]
  );

  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {isUserLoggedIn
          ?
          <>
            <NavItem
              icon={<FormatListBulletedIcon />}
              text={t('tasks')}
              to={routes.content.task.list}
            />
            <NavItem
              icon={<AccountBalanceWalletIcon />}
              text={t('accounts')}
              to={routes.accounts}
            />
          </>
          :
          <NavItem
            icon={<HomeIcon />}
            text={t('home')}
            to={routes.home}
          />
        }
      </List>
    </Box>
  );
}

export default AppNavigation;
