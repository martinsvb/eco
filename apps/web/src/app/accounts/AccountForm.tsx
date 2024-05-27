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
import ControllerTextField from '../components/formControls/ControllerTextField';
import ControllerSelect from '../components/formControls/ControllerSelect';
import { useMobilePortraitDetection } from '../hooks/useMobileDetection';
import { useFormValues } from '../hooks/useFormValues';
import { useAccountFormHandlers } from './useAccountFormHandlers';

const AccountForm = () => {

  const { t, i18n } = useTranslation();

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

  const language = i18n.language.includes('-') ? i18n.language.split('-')[0] : i18n.language;

  const { submit, handleClick, handleClose } = useAccountFormHandlers(data, id);

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
              label: t('labels:name')
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
              label: t('labels:iban')
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
              label: t('labels:description')
            }}
          />
        </Grid>
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
              onClick={handleClick}
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
