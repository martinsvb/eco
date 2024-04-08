import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import LoginWrapper from '../user/LoginWrapper';
import AccountForm from './AccountForm';
import { useEffect } from 'react';
import { apiGetAccount, setAccount, useAppDispatch } from '@eco/redux';
import { useParams } from 'react-router-dom';

export const AccountsEdit = () => {

  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (id) {
        dispatch(apiGetAccount(id));
      }

      return () => {
        dispatch(setAccount(null));
      }
    },
    [dispatch, id]
  );

  return (
    <>
      <Typography variant='h3' mb={3}>{t('accounts:editAccountTitle')}</Typography>
      <LoginWrapper>
        <AccountForm />
      </LoginWrapper>
    </>
  );
};
