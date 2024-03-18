import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';
import { selectIsUserLoggedIn, useShallowEqualSelector } from '@eco/redux';
import UserMenu from '../user/UserMenu';
import LoginButton from '../user/LoginButton';

const Header = () => {

  const { zIndex } = useTheme();

  const isUserLoggedIn = useShallowEqualSelector(selectIsUserLoggedIn);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: zIndex.drawer + 1
      }}
    >
      <Toolbar>
        <Box sx={{flexGrow: 1}}>
          <Typography variant="h6" noWrap component="div">
            Eco
          </Typography>
        </Box>
        <Box sx={{flexGrow: 0}}>
          {isUserLoggedIn ?
            <UserMenu />
            :
            <LoginButton />
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
