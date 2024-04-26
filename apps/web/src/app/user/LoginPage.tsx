import { useTranslation } from 'react-i18next';
import { Box, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import LoginButton from './LoginButton';
import RegisterButton from './RegistrationButton';

const LoginPage = () => {

  const { t } = useTranslation();

  const isMobilePortrait = useMediaQuery((theme: Theme) => {
    return `${theme.breakpoints.down('sm')} and (orientation: portrait)`;
  });

  return (
      <Box>
        <Typography variant='h3' mb={1} mx={1}>{t('users:notLoggedIn')}</Typography>
        <Typography variant='h6' mb={2} mx={1}>{t('users:notLoggedInInfo')}</Typography>
        {isMobilePortrait &&
          <Stack
            direction="row"
            justifyContent="flex-start"
          >
            <LoginButton />
            <Typography variant='h6' mx={1}>/</Typography>
            <RegisterButton />
          </Stack>
        }
      </Box>
  );
}

export default LoginPage;
