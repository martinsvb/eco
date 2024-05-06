import { MouseEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ms from 'ms';
import { Box, Tooltip, IconButton, Menu, MenuItem, Typography, PopoverOrigin, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  logout,
  resetAccounts,
  resetCompanies,
  resetContent,
  resetUsers,
  selectUserAuth,
  useAppDispatch,
  useShallowEqualSelector
} from '@eco/redux';
import { routes } from '@eco/config';
import UserLanguage from './UserLanguage';
import UserColorMode from './UserColorMode';
import AppAvatar from '../components/avatar/AppAvatar';

interface UserMenuProps {
  isMobile?: boolean;
}

const minHeight = 52;

const UserMenu = ({isMobile}: UserMenuProps) => {

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const user = useShallowEqualSelector(selectUserAuth);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const { palette } = useTheme();

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

  const handleEdit = useCallback(
    () => {
      navigate(routes.usersEdit.replace(':id', user?.id));
    },
    [navigate, user?.id]
  );

  const handleLogout = useCallback(
    () => {
      setAnchorElUser(null);
      dispatch(logout());
      dispatch(resetAccounts());
      dispatch(resetContent());
      dispatch(resetUsers());
      dispatch(resetCompanies());
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
            name={user?.name}
            picture={user?.picture}
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
        <MenuItem
          sx={{
            minHeight,
            py: 2,
            justifyContent: 'space-between',
            cursor: 'default',
            borderBottom: `1px solid ${palette.grey[500]}`
          }}
        >
          <Typography>{user?.name}</Typography>
          <Tooltip
            title={t('labels:edit')}
            enterDelay={ms('0.1s')}
          >
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </MenuItem>
        <MenuItem sx={{minHeight}}>
          <UserColorMode />
        </MenuItem>
        <MenuItem sx={{minHeight, py: 1, justifyContent: 'center'}}>
          <UserLanguage />
        </MenuItem>
        <MenuItem
          sx={{
            minHeight,
            py: 2,
          }}
          onClick={handleLogout}
        >
          <LogoutIcon sx={{mr: 1}} />
          <Typography textAlign="center">{t('labels:logout')}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
