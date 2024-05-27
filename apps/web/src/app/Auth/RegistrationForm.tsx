import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { compose, filter, isEmpty, not, omit } from 'ramda';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { countries } from 'countries-list';
import { apiPostRegister, selectIsAuthLoading, useAppDispatch, useAppSelector } from '@eco/redux';
import { AuthOperations, RegistrationData, RegistrationItems, UserItems } from '@eco/types';
import { getRegistrationValidationSchema } from '@eco/validation';
import { allowedCountries } from '@eco/config';
import { Languages } from '@eco/locales';
import ControllerTextField from '../components/formControls/ControllerTextField';
import ControllerSelect from '../components/formControls/ControllerSelect';

interface RegistrationFormProps {
  handleClose: () => void;
}

const RegistrationForm = ({handleClose}: RegistrationFormProps) => {

  const dispatch = useAppDispatch();

  const { t, i18n: { language } } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const isLoading = useAppSelector((state) => selectIsAuthLoading(state, AuthOperations.register));

  const { control, formState: { isValid }, handleSubmit, watch } = useForm<RegistrationData>({
    resolver: yupResolver(getRegistrationValidationSchema()),
    mode: 'onTouched',
    values: {
      [UserItems.Email]: '',
      [UserItems.Name]: '',
      [UserItems.Password]: '',
      [UserItems.PasswordConfirmation]: '',
      [RegistrationItems.companyName]: '',
      [RegistrationItems.country]: '',
    }
  });

  const data = watch();

  const submit = useCallback(
    (data: RegistrationData) => {
      dispatch(apiPostRegister({
        body: filter(compose(not, isEmpty), omit([UserItems.PasswordConfirmation], data)),
        onSuccess: () => {
          enqueueSnackbar(t('registration:registered'), {variant: 'success'});
        }
      }));
    },
    [dispatch, enqueueSnackbar, t]
  );

  const handleClick = useCallback(
    () => {
      submit(data);
    },
    [submit, data]
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={UserItems.Email}
            control={control}
            defaultValue={data.email}
            fieldProps={{
              required: true,
              label: t('labels:email')
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={UserItems.Name}
            control={control}
            defaultValue={data.name}
            fieldProps={{
              required: true,
              label: t('labels:name')
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={UserItems.Password}
            control={control}
            defaultValue={data.password}
            fieldProps={{
              required: true,
              label: t('labels:password'),
              type: 'password'
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={UserItems.PasswordConfirmation}
            control={control}
            defaultValue={data.passwordConfirmation}
            fieldProps={{
              required: true,
              label: t('labels:passwordConfirmation'),
              type: 'password'
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={RegistrationItems.companyName}
            control={control}
            defaultValue={data.companyName}
            fieldProps={{
              required: true,
              label: t('labels:companyName')
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerSelect
            name={RegistrationItems.country}
            control={control}
            defaultValue={data.country}
            fieldProps={{
              required: true,
              label: t('labels:country'),
              id: RegistrationItems.country,
              values: allowedCountries.map((id) => ({
                id,
                label: countries[id][language === Languages.en ? 'name' : 'native']
              }))
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
              {t('labels:register')}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(RegistrationForm);
