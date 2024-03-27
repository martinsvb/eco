import { memo } from 'react';
import { alpha, Divider, Paper, Stack, useMediaQuery, useTheme } from '@mui/material';
import { unsplashUrl } from '@eco/config';
import GoogleLoginCmp from './GoogleLogin';
import LoginForm from './LoginForm';

interface LoginProps {
  handleClose: () => void;
}

const Login = ({handleClose}: LoginProps) => {

  const { palette, shape } = useTheme();

  const isLightMode = useMediaQuery('(prefers-color-scheme: light)');

  return (
    <Stack
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: unsplashUrl,
      }}
    >
      <Stack
        width={300}
        divider={<Divider orientation="horizontal" flexItem />}
        component={Paper}
        spacing={2}
        padding={4}
        sx={{
          backgroundColor: alpha(palette.common[isLightMode ? 'white' : 'black'], .8),
          borderRadius: shape.borderRadius / 2
        }}
      >
        <GoogleLoginCmp handleClose={handleClose} />
        <LoginForm handleClose={handleClose} />
      </Stack>
    </Stack>
  );
};

export default memo(Login);
