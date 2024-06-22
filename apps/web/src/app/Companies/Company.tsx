import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { omit } from 'ramda';
import { CompanyItems } from '@eco/types';
import { apiGetCompany, selectCompany, setCompany, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { DataList } from '../components/dataList/DataList';
import { getDataListPairs } from '../helpers/getDataListPairs';

export const Company = () => {

  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const company = useShallowEqualSelector(selectCompany);

  useEffect(
    () => {
      if (id) {
        dispatch(apiGetCompany(id));
      }

      return () => {
        dispatch(setCompany(null));
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
          {t('company')}
        </Typography>
      </Stack>
      {company &&
        <DataList
          titleWidth={140}
          data={getDataListPairs(
            omit(
              [
                CompanyItems.Id,
                CompanyItems.UpdatedAt,
              ],
              company
            ),
            {
              translations: {
                [CompanyItems.Name]: t('labels:name'),
                [CompanyItems.Country]: t('labels:country'),
                [CompanyItems.Ico]: t('labels:ico'),
                [CompanyItems.Vat]: t('labels:vat'),
                [CompanyItems.Address]: t('labels:address'),
                [CompanyItems.Email]: t('labels:email'),
                [CompanyItems.Note]: t('labels:note'),
                [CompanyItems.CreatedAt]: t('labels:createdAt'),
              },
              valueFormatters: {
                [CompanyItems.CreatedAt]: (value: string) => dayjs(value).format('DD. MM. YYYY HH:mm'),
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
