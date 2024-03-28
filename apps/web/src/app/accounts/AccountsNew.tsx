import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { routes } from '@eco/config';
import LoginWrapper from '../user/LoginWrapper';
import AccountForm from './AccountForm';

export const AccountsNew = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClose = useCallback(
    () => {
      navigate(`${routes.base}${routes.accounts}`);
    },
    [navigate]
  );

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant='h3'>{t('accounts:newAccountTitle')}</Typography>
        <IconButton
          aria-label={t('accounts:newAccountClose')}
          onClick={handleClose}
          sx={{
            alignSelf: 'baseline'
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <LoginWrapper>
        <AccountForm />
      </LoginWrapper>
    </Box>
  );
};
