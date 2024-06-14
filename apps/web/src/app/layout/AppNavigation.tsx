import { ReactNode, useEffect } from 'react';
import { Link, LinkProps, To, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Box, List, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BusinessIcon from '@mui/icons-material/Business';
import ContactsIcon from '@mui/icons-material/Contacts';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupIcon from '@mui/icons-material/Group';
import { routes } from '@eco/config';
import { selectIsUserLoggedIn, selectUserAuth, useAppSelector, useShallowEqualSelector } from '@eco/redux';
import { ScopeItems, UserRoles } from '@eco/types';

interface NavItemProps {
  icon: ReactNode;
  text: string;
  to: To;
}

const ListItemButtonLink = styled(ListItemButton)<LinkProps>(({ theme }) => null);

const NavItem = ({icon, text, to}: NavItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButtonLink LinkComponent={Link} to={to} >
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText>
          {text}
        </ListItemText>
      </ListItemButtonLink>
    </ListItem>
  )
}

export const AppNavigation = () => {

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const { rights, role } = useShallowEqualSelector(selectUserAuth);

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
            {rights.scopes[ScopeItems.Records]?.read &&
              <NavItem
                icon={<DescriptionIcon />}
                text={t('records')}
                to={routes.content.record.list}
              />
            }
            {rights.scopes[ScopeItems.Tasks]?.read &&
              <NavItem
                icon={<FormatListBulletedIcon />}
                text={t('tasks')}
                to={routes.content.task.list}
              />
            }
            {rights.scopes[ScopeItems.Accounts]?.read &&
              <NavItem
                icon={<AccountBalanceWalletIcon />}
                text={t('accounts')}
                to={routes.accounts}
              />
            }
            {rights.scopes[ScopeItems.Contacts]?.read &&
              <NavItem
                icon={<ContactsIcon />}
                text={t('contacts')}
                to={routes.contacts}
              />
            }
            {rights.scopes[ScopeItems.Users]?.read &&
              <NavItem
                icon={<GroupIcon />}
                text={t('users')}
                to={routes.users}
              />
            }
            {rights.scopes[ScopeItems.Companies]?.read &&
              <NavItem
                icon={<BusinessIcon />}
                text={role === UserRoles.Admin ? t('companies') : t('company')}
                to={routes.companies}
              />
            }
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
