import { MouseEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, PopoverOrigin } from '@mui/material';
import { logout, resetAccounts, resetUsers, selectUserAuth, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { routes } from '@eco/config';
import { useTranslation } from 'react-i18next';
import UserLanguage from './UserLanguage';

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
      dispatch(resetUsers());
      navigate(`${routes.base}${routes.home}`);
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

  const userInitials = user.name?.split(' ').map((namePart) => namePart[0]).join('') || 'U';

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={userInitials} src={user.picture || ''}>
            {userInitials}
          </Avatar>
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
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">{t('labels:logout')}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <UserLanguage />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
