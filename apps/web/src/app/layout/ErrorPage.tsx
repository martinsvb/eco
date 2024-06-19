import { useTranslation } from 'react-i18next';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useCallback } from 'react';

export const ErrorPage = () => {

  const { t } = useTranslation();

  const handleReload = useCallback(
    () => {
      window.location.reload();
    },
    []
  );

  return (
    <Box>
      <Typography variant='h2' mb={1}>{t('error')}</Typography>
      <Divider />
      <Typography variant='body1' mt={2} mb={4}>{t('errorPageInfo')}</Typography>
      <Button
        color="inherit"
        variant="contained"
        id="reloadButton"
        onClick={handleReload}
      >
        {t('reload')}
      </Button>
    </Box>
  );
};
