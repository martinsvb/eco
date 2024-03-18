import { Dispatch, SetStateAction, useCallback } from 'react';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { selectIsUserLoggedIn, useShallowEqualSelector } from '@eco/redux';
import UserMenu from '../user/UserMenu';
import LoginButton from '../user/LoginButton';

interface AppToolbarProps {
  isMobile?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const AppToolbar = ({isMobile, setOpen}: AppToolbarProps) => {

  const isUserLoggedIn = useShallowEqualSelector(selectIsUserLoggedIn);

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
        {isUserLoggedIn ?
          <UserMenu isMobile={isMobile} />
          :
          <LoginButton />
        }
      </Box>
    </Toolbar>
  );
}

export default AppToolbar;
