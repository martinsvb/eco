import { MouseEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { logout, resetAccounts, resetUsers, selectUserAuth, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { routes } from '@eco/config';

const UserMenu = () => {

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const user = useShallowEqualSelector(selectUserAuth);

  console.log({user})

  const navigate = useNavigate();

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

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.name || 'U'} src={user.picture || ''} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
