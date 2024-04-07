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
      if (isUserLoggedIn && [routes.base, `${routes.base}${routes.home}`].includes(location.pathname)) {
        navigate(`${routes.base}${routes.accounts}`);
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
              icon={<AccountBalanceWalletIcon />}
              text={t('accounts')}
              to={`${routes.base}${routes.accounts}`}
            />
            <NavItem
              icon={<FormatListBulletedIcon />}
              text={t('tasks')}
              to={`${routes.base}${routes.content.task.list}`}
            />
          </>
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
