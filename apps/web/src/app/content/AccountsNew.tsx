import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import LoginWrapper from '../user/LoginWrapper';
import AccountForm from './AccountForm';

export const AccountsNew = () => {

  const { t } = useTranslation();

  return (
    <>
      <Typography variant='h3' mb={4}>{t('accounts:newAccountTitle')}</Typography>
      <LoginWrapper>
        <AccountForm />
      </LoginWrapper>
    </>
  );
};
