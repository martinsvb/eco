import { Dispatch, SetStateAction, useCallback } from 'react';
import { Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { selectIsUserLoggedIn, selectRegistration, useShallowEqualSelector } from '@eco/redux';
import UserMenu from '../user/UserMenu';
import LoginButton from '../user/LoginButton';
import RegisterButton from '../user/RegistrationButton';
import { RegistrationState } from '@eco/types';

interface AppToolbarProps {
  isMobile?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const AppToolbar = ({isMobile, setOpen}: AppToolbarProps) => {

  const isUserLoggedIn = useShallowEqualSelector(selectIsUserLoggedIn);

  const state = useShallowEqualSelector(selectRegistration);

  const handleOpen = useCallback(
    () => {
      setOpen?.(true);
    },
    []
  );

  return (
    <Toolbar>
      {isMobile &&
        <Box sx={{flexGrow: 0}}>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
        </Box>
      }
      <Box sx={{flexGrow: 1}}>
        <Typography variant="h6" noWrap component="div">
          Eco
        </Typography>
      </Box>
      <Box sx={{flexGrow: 0}}>
        {isUserLoggedIn && state === RegistrationState.none ?
          <UserMenu isMobile={isMobile} />
          :
          <Stack direction="row">
            <LoginButton isMobile={isMobile} />
            {!isMobile && <Typography variant='h6' mx={1}>|</Typography>}
            <RegisterButton isMobile={isMobile} />
          </Stack>
        }
      </Box>
    </Toolbar>
  );
}

export default AppToolbar;
