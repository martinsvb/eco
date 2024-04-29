import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { alpha, Chip, Divider, Paper, Stack, useTheme } from '@mui/material';
import { unsplashUrl } from '@eco/config';
import GoogleLoginCmp from './GoogleLogin';
import LoginForm from './LoginForm';

interface LoginProps {
  handleClose: () => void;
}

const Login = ({handleClose}: LoginProps) => {

  const { palette, shape } = useTheme();

  const { t } = useTranslation();

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
        divider={
          <Divider orientation="horizontal" flexItem>
            <Chip label={t('labels:or')} />
          </Divider>
        }
        component={Paper}
        spacing={2}
        padding={4}
        sx={{
          backgroundColor: alpha(palette.background.default, .8),
          borderRadius: shape.borderRadius / 2
        }}
      >
        <GoogleLoginCmp />
        <LoginForm handleClose={handleClose} />
      </Stack>
    </Stack>
  );
};

export default memo(Login);
