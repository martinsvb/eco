import { Dispatch, SetStateAction, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { routes } from '@eco/config';
import {
  selectIsUserLoggedIn,
  selectRegistration,
  selectUserAuth,
  useAppSelector,
  useShallowEqualSelector
} from '@eco/redux';
import { RegistrationState } from '@eco/types';
import UserMenu from '../user/UserMenu';
import LoginButton from '../user/LoginButton';
import RegistrationButton from '../user/RegistrationButton';

interface AppToolbarMobileProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AppToolbarMobile = ({setOpen}: AppToolbarMobileProps) => {

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const state = useAppSelector(selectRegistration);

  const { companyName } = useShallowEqualSelector(selectUserAuth);

  const handleOpen = useCallback(
    () => {
      setOpen(true);
    },
    [setOpen]
  );

  return (
    <Toolbar>
      <Box sx={{flexGrow: 0}}>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleOpen}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Box sx={{flexGrow: 1}}>
        <Link
          to={routes.home}
          style={{
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {companyName ? companyName : 'Econaw'}
          </Typography>
        </Link>
      </Box>
      <Box sx={{flexGrow: 0}}>
        {isUserLoggedIn && state === RegistrationState.none ?
          <UserMenu isMobile />
          :
          <Stack direction="row">
            <LoginButton isMobile />
            <RegistrationButton isMobile />
          </Stack>
        }
      </Box>
    </Toolbar>
  );
}

export default AppToolbarMobile;
