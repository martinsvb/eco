import { useTranslation } from 'react-i18next';
import { Box, Stack, Typography } from '@mui/material';
import { useMobilePortraitDetection } from '@eco/config';
import LoginButton from './LoginButton';
import RegistrationButton from './RegistrationButton';

const LoginPage = () => {

  const { t } = useTranslation();

  const isMobilePortrait = useMobilePortraitDetection();

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
            <RegistrationButton />
          </Stack>
        }
      </Box>
  );
}

export default LoginPage;
