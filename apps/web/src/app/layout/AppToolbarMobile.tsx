import { Dispatch, SetStateAction, useCallback } from 'react';
import { Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { selectIsUserLoggedIn, selectRegistration, useAppSelector } from '@eco/redux';
import { RegistrationState } from '@eco/types';
import UserMenu from '../user/UserMenu';
import LoginButton from '../user/LoginButton';
import RegisterButton from '../user/RegistrationButton';

interface AppToolbarMobileProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AppToolbarMobile = ({setOpen}: AppToolbarMobileProps) => {

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const state = useAppSelector(selectRegistration);

  const handleOpen = useCallback(
    () => {
      setOpen(true);
    },
    []
  );

  return (
    <Toolbar>
      <Box sx={{flexGrow: 0}}>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleOpen}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Box sx={{flexGrow: 1}}>
        <Typography variant="h6" noWrap component="div">
          Eco
        </Typography>
      </Box>
      <Box sx={{flexGrow: 0}}>
        {isUserLoggedIn && state === RegistrationState.none ?
          <UserMenu isMobile />
          :
          <Stack direction="row">
            <LoginButton isMobile />
            <RegisterButton isMobile />
          </Stack>
        }
      </Box>
    </Toolbar>
  );
}

export default AppToolbarMobile;
