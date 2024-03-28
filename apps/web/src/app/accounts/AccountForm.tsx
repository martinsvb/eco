import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { compose, filter, isEmpty, not, omit } from 'ramda';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { apiPostAccount, selectIsAccountsLoading, useAppDispatch, useAppSelector } from '@eco/redux';
import { AccountData, AccountItems, ApiOperations } from '@eco/types';
import { getAccountValidationSchema } from '@eco/validation';
import { routes } from '@eco/config';

const AccountForm = () => {

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const isLoading = useAppSelector((state) => selectIsAccountsLoading(state, ApiOperations.create));

  const { control, formState: { errors, isValid }, handleSubmit, watch } = useForm<AccountData>({
    resolver: yupResolver(getAccountValidationSchema()),
    mode: 'onTouched',
    values: {
      [AccountItems.iban]: '',
      [AccountItems.name]: '',
      [AccountItems.description]: '',
    }
  });

  const data = watch();

  const submit = useCallback(
    (data: AccountData) => {
      dispatch(apiPostAccount({
        body: filter(compose(not, isEmpty), omit([AccountItems.description], data)),
        onSuccess: () => {
          enqueueSnackbar(t('accounts:created'), {variant: 'success'});
          navigate(`${routes.base}${routes.accounts}`);
        }
      }));
    },
    [dispatch, enqueueSnackbar, navigate]
  );

  const handleClick = useCallback(
    () => {
      submit(data);
    },
    [dispatch, enqueueSnackbar, data]
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container rowSpacing={4} columnSpacing={2}>
        <Grid md={6} xs={12}>
          <Controller
            name={AccountItems.name}
            control={control}
            defaultValue={data.name}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                required
                label={t('labels:name')}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <Controller
            name={AccountItems.iban}
            control={control}
            defaultValue={data.iban}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                required
                label={t('labels:iban')}
                error={Boolean(errors.iban)}
                helperText={errors.iban?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={12}>
          <Controller
            name={AccountItems.description}
            control={control}
            defaultValue={data.description}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={t('labels:description')}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>
        <Grid xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <LoadingButton
              disabled={!isValid}
              loading={isLoading}
              type="submit"
              variant="contained"
              onClick={handleClick}
              sx={{mr: 1}}
            >
              {t('labels:create')}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(AccountForm);
