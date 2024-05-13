import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import AccountForm from './AccountForm';

export const AccountsNew = () => {

  const { t } = useTranslation();

  return (
    <>
      <Typography variant='h3' mb={3}>{t('accounts:newAccountTitle')}</Typography>
      <AccountForm />
    </>
  );
};
