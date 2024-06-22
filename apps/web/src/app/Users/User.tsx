import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { omit } from 'ramda';
import { UserItems } from '@eco/types';
import { apiGetUser, selectUser, setUser, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { DataList } from '../components/dataList/DataList';
import { getDataListPairs } from '../helpers/getDataListPairs';

export const User = () => {

  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const user = useShallowEqualSelector(selectUser);

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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant='h3'>
          {t('user')}
        </Typography>
      </Stack>
      {user &&
        <DataList
          titleWidth={140}
          data={getDataListPairs(
            omit(
              [
                UserItems.Id,
                UserItems.UpdatedAt,
                UserItems.CompanyId,
                UserItems.Rights,
                UserItems.Otp
              ],
              user
            ),
            {
              translations: {
                [UserItems.Name]: t('labels:name'),
                [UserItems.Email]: t('labels:email'),
                [UserItems.IsEmailConfirmed]: t('labels:isEmailConfirmed'),
                [UserItems.Phone]: t('labels:phone'),
                [UserItems.Picture]: t('labels:picture'),
                [UserItems.Note]: t('labels:note'),
                [UserItems.Role]: t('labels:role'),
                [UserItems.Origin]: t('labels:origin'),
                [UserItems.CreatedAt]: t('labels:createdAt'),
              },
              valueFormatters: {
                [UserItems.CreatedAt]: (value: string) => dayjs(value).format('DD. MM. YYYY HH:mm'),
              }
            }
          )}
          mt={2}
          mr={2}
          display="inline-block"
        />
      }
    </>
  );
};
