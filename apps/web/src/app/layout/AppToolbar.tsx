import { Link } from 'react-router-dom';
import { Box, Divider, Stack, Toolbar, Typography, useTheme } from '@mui/material';
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

const AppToolbar = () => {

  const { palette } = useTheme();

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const state = useAppSelector(selectRegistration);

  const { companyName } = useShallowEqualSelector(selectUserAuth);

  return (
    <Toolbar>
      <Box sx={{flexGrow: 1}}>
        <Link
          to={routes.home}
          style={{
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Econaw
            {companyName && `: ${companyName}`}
          </Typography>
        </Link>
      </Box>
      <Box sx={{flexGrow: 0}}>
        {isUserLoggedIn && state === RegistrationState.none ?
          <UserMenu />
          :
          <Stack
            direction="row"
            divider={
              <Divider
                flexItem
                orientation="vertical"
                color={palette.common.white}
              />
            }
            spacing={1}
          >
            <LoginButton />
            <RegistrationButton />
          </Stack>
        }
      </Box>
    </Toolbar>
  );
}

export default AppToolbar;
