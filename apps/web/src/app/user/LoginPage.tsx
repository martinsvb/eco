import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

const LoginPage = () => {

  const { t } = useTranslation();

  return (
      <Box>
        <Typography variant='h3' mb={1} mx={1}>{t('users:notLoggedIn')}</Typography>
        <Typography variant='h6' mb={2} mx={1}>{t('users:notLoggedInInfo')}</Typography>
      </Box>
  );
}

export default LoginPage;
