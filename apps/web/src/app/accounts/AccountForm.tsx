import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import CurrencyList from 'currency-list'
import { selectAccount, selectIsAccountsLoading, useAppSelector, useShallowEqualSelector } from '@eco/redux';
import { AccountData, AccountItems, ApiOperations } from '@eco/types';
import { getAccountValidationSchema } from '@eco/validation';
import { allowedCurrencies } from '@eco/config';
import { GridControllerSelect, GridControllerTextField } from '../components';
import { gridFieldSettings } from '../helpers';
import { useFormValues, useMobilePortraitDetection } from '../hooks';
import { useAccountFormHandlers } from './useAccountFormHandlers';
import { getLanguageCode } from '@eco/locales';

const AccountForm = () => {

  const { t, i18n: { language } } = useTranslation();

  const { id } = useParams();

  const isMobilePortrait = useMobilePortraitDetection();

  const isLoading = useAppSelector(
    (state) => selectIsAccountsLoading(state, id ? ApiOperations.edit : ApiOperations.create)
  );

  const account = useShallowEqualSelector(selectAccount);

  const values = useFormValues<AccountData>(
    account,
    [AccountItems.iban, AccountItems.name, AccountItems.currency, AccountItems.description]
  );

  const { control, formState: { isValid }, handleSubmit, watch } = useForm<AccountData>({
    resolver: yupResolver(getAccountValidationSchema()),
    mode: 'onTouched',
    values
  });

  const data = watch();

  const currencies = CurrencyList.getAll();

  const lngCode = getLanguageCode(language);

  const { submit, handleClose } = useAccountFormHandlers(id);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container rowSpacing={2} columnSpacing={2} width={isMobilePortrait ? '100%' : 800}>
        <GridControllerTextField
          {...gridFieldSettings({md: 6, xs: 12}, control, AccountItems.name, data)}
          fieldProps={{
            required: true,
            label: t('labels:name')
          }}
        />
        <GridControllerTextField
          {...gridFieldSettings({md: 6, xs: 12}, control, AccountItems.iban, data)}
          fieldProps={{
            required: true,
            label: t('labels:iban')
          }}
        />
        {!!currencies[lngCode] &&
          <GridControllerSelect
            {...gridFieldSettings({md: 6, xs: 12}, control, AccountItems.currency, data)}
            fieldProps={{
              required: true,
              label: t('labels:currency'),
              values: Object.entries(currencies[lngCode])
                .filter(([currency]) => allowedCurrencies.includes(currency))
                .map(([id, {name}]) => ({id, label: name}))
            }}
          />
        }
        <GridControllerTextField
          {...gridFieldSettings({md: 6, xs: 12}, control, AccountItems.description, data)}
          fieldProps={{
            multiline: true,
            label: t('labels:description')
          }}
        />
        <Grid xs={12}>
          <Stack direction="row" justifyContent="end">
            <Button
              variant="text"
              onClick={handleClose}
              sx={{mr: 1}}
            >
              {t('labels:close')}
            </Button> 
            <LoadingButton
              disabled={!isValid}
              loading={isLoading}
              type="submit"
              variant="contained"
            >
              {id ? t('labels:edit') : t('labels:create')}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(AccountForm);
