import { Box, Stack, Toolbar, Typography } from '@mui/material';
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

const AppToolbar = () => {

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const state = useAppSelector(selectRegistration);

  const { companyName } = useShallowEqualSelector(selectUserAuth);

  return (
    <Toolbar>
      <Box sx={{flexGrow: 1}}>
        <Typography variant="h6" noWrap component="div">
          Econaw
          {companyName && `, ${companyName}`}
        </Typography>
      </Box>
      <Box sx={{flexGrow: 0}}>
        {isUserLoggedIn && state === RegistrationState.none ?
          <UserMenu />
          :
          <Stack direction="row">
            <LoginButton />
            <Typography variant='h6' mx={1}>|</Typography>
            <RegistrationButton />
          </Stack>
        }
      </Box>
    </Toolbar>
  );
}

export default AppToolbar;
