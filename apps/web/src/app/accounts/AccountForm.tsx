import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { compose, filter, isEmpty, not, omit } from 'ramda';
import { Button, Stack, Theme, useMediaQuery } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import CurrencyList from 'currency-list'
import { useSnackbar } from 'notistack';
import { apiPostAccount, selectIsAccountsLoading, useAppDispatch, useAppSelector } from '@eco/redux';
import { AccountData, AccountItems, ApiOperations } from '@eco/types';
import { getAccountValidationSchema } from '@eco/validation';
import { allowedCurrencies, routes } from '@eco/config';
import ControllerTextField from '../components/formControls/ControllerTextField';
import ControllerSelect from '../components/formControls/ControllerSelect';

const AccountForm = () => {

  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const isMobilePortrait = useMediaQuery((theme: Theme) => {
    return `${theme.breakpoints.down('sm')} and (orientation: portrait)`
  });

  const isLoading = useAppSelector((state) => selectIsAccountsLoading(state, ApiOperations.create));

  const { control, formState: { errors, isValid }, handleSubmit, watch } = useForm<AccountData>({
    resolver: yupResolver(getAccountValidationSchema()),
    mode: 'onTouched',
    values: {
      [AccountItems.iban]: '',
      [AccountItems.name]: '',
      [AccountItems.currency]: '',
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

  const handleClose = useCallback(
    () => {
      navigate(`${routes.base}${routes.accounts}`);
    },
    [navigate]
  );

  const currencies = CurrencyList.getAll();

  const language = i18n.language.includes('-') ? i18n.language.split('-')[0] : i18n.language;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container rowSpacing={2} columnSpacing={2} width={isMobilePortrait ? '100%' : 800}>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={AccountItems.name}
            control={control}
            defaultValue={data.name}
            fieldProps={{
              fullWidth: true,
              required: true,
              label: t('labels:name'),
              id: AccountItems.name
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={AccountItems.iban}
            control={control}
            defaultValue={data.iban}
            fieldProps={{
              fullWidth: true,
              required: true,
              label: t('labels:iban'),
              id: AccountItems.iban
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          {!!currencies[language] &&
            <ControllerSelect
              name={AccountItems.currency}
              control={control}
              defaultValue={data.currency}
              fieldProps={{
                required: true,
                label: t('labels:currency'),
                id: AccountItems.currency,
                values: Object.entries(currencies[language])
                  .filter(([currency]) => allowedCurrencies.includes(currency))
                  .map(([id, {name}]) => ({id, label: name}))
              }}
            />
          }
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={AccountItems.description}
            control={control}
            defaultValue={data.description}
            fieldProps={{
              fullWidth: true,
              multiline: true,
              label: t('labels:description'),
              id: AccountItems.description
            }}
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
            <Button
              variant="text"
              onClick={handleClose}
            >
              {t('labels:close')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(AccountForm);
