import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { apiGetUser, setUser, useAppDispatch } from '@eco/redux';
import UserForm from './UserForm';

export const UserEdit = () => {

  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (id) {
        dispatch(apiGetUser(id));
      }

      return () => {
        dispatch(setUser(null));
      }
    },
    [dispatch, id]
  );

  return (
    <>
      <Typography variant='h3' mb={3}>{t('users:editUserTitle')}</Typography>
      <UserForm />
    </>
  );
};
