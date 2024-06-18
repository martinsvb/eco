import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Chip, Stack, Typography } from '@mui/material';
import { apiGetError, selectError, setError, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { useMobileDetection } from '../hooks';
import { getErrorData } from './getErrorData';
import { ErrorDetail } from './ErrorDetail';

export const Error = () => {

  const { t } = useTranslation();

  const isMobile = useMobileDetection();

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const error = useShallowEqualSelector(selectError);

  useEffect(
    () => {
      if (id) {
        dispatch(apiGetError(id));
      }

      return () => {
        dispatch(setError(null));
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
          {t('error')}
        </Typography>
        {error?.dateTime && <Chip label={error.dateTime} />}
      </Stack>
      {error &&
        <Stack
          direction={isMobile ? 'column' : 'row'}
          alignItems="start"
          mt={2}
        >
          <ErrorDetail
            titleWidth={140}
            data={getErrorData(error, 'error')}
            name={t('labels:errorName')}
          />
          <ErrorDetail
            titleWidth={160}
            data={getErrorData(error, 'user')}
            name={t('labels:userName')}
          />
          <ErrorDetail
            titleWidth={160}
            data={getErrorData(error, 'company')}
            name={t('labels:companyName')}
          />
        </Stack>
      }
    </>
  );
};
