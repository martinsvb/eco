import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { omit } from 'ramda';
import { ContactItems } from '@eco/types';
import { apiGetContact, selectContact, setContact, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { DataList } from '../components/dataList/DataList';
import { getDataListPairs } from '../helpers/getDataListPairs';

export const Contact = () => {

  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const contact = useShallowEqualSelector(selectContact);

  useEffect(
    () => {
      if (id) {
        dispatch(apiGetContact(id));
      }

      return () => {
        dispatch(setContact(null));
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
          {t('contact')}
        </Typography>
      </Stack>
      {contact &&
        <DataList
          titleWidth={140}
          data={getDataListPairs(
            omit(
              [
                ContactItems.Id,
                ContactItems.UpdatedAt,
                ContactItems.CreatorId,
                ContactItems.CompanyId,
              ],
              contact
            ),
            {
              translations: {
                [ContactItems.Name]: t('labels:name'),
                [ContactItems.Country]: t('labels:country'),
                [ContactItems.Ico]: t('labels:ico'),
                [ContactItems.Vat]: t('labels:vat'),
                [ContactItems.Address]: t('labels:address'),
                [ContactItems.Email]: t('labels:email'),
                [ContactItems.Phone]: t('labels:phone'),
                [ContactItems.Note]: t('labels:note'),
                [ContactItems.CreatedAt]: t('labels:createdAt'),
              },
              valueFormatters: {
                [ContactItems.CreatedAt]: (value: string) => dayjs(value).format('DD. MM. YYYY HH:mm'),
              }
            }
          )}
          mt={2}
          mr={2}
        />
      }
    </>
  );
};
