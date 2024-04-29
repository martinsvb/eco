import { MouseEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ms from 'ms';
import { Box, Tooltip, IconButton, Menu, MenuItem, Typography, PopoverOrigin } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  logout,
  resetAccounts,
  resetContent,
  resetUsers,
  selectUserAuth,
  useAppDispatch,
  useShallowEqualSelector
} from '@eco/redux';
import { routes } from '@eco/config';
import { useTranslation } from 'react-i18next';
import UserLanguage from './UserLanguage';
import UserColorMode from './UserColorMode';
import AppAvatar from '../components/avatar/AppAvatar';

interface UserMenuProps {
  isMobile?: boolean;
}

const UserMenu = ({isMobile}: UserMenuProps) => {

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const user = useShallowEqualSelector(selectUserAuth);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleOpenUserMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setAnchorElUser(null);
    },
    []
  );

  const handleLogout = useCallback(
    () => {
      setAnchorElUser(null);
      dispatch(logout());
      dispatch(resetAccounts());
      dispatch(resetContent());
      dispatch(resetUsers());
      navigate(routes.home);
    },
    []
  );

  const anchorOrigin: PopoverOrigin = isMobile
    ? {
      vertical: 'bottom',
      horizontal: 'right',
    }
    : {
      vertical: 'top',
      horizontal: 'right',
    };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip
        title={t('labels:userMenu')}
        enterDelay={ms('0.1s')}
      >
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AppAvatar
            name={user.name}
            picture={user.picture}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={isMobile ? { mb: '45px' } : { mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={anchorOrigin}
        keepMounted
        transformOrigin={anchorOrigin}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem sx={{minHeight: 52}}>
          <UserColorMode />
        </MenuItem>
        <MenuItem sx={{minHeight: 52, py: 1, justifyContent: 'center'}}>
          <UserLanguage />
        </MenuItem>
        <MenuItem sx={{minHeight: 52, py: 2}} onClick={handleLogout}>
          <LogoutIcon sx={{mr: 1}} />
          <Typography textAlign="center">{t('labels:logout')}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
