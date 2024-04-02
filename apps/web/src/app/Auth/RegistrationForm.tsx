import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { compose, filter, isEmpty, not, omit } from 'ramda';
import { Button, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { apiPostRegister, selectIsAuthLoading, useAppDispatch, useAppSelector } from '@eco/redux';
import { AuthOperations, RegistrationData, RegistrationItems } from '@eco/types';
import { getRegistrationValidationSchema } from '@eco/validation';

interface RegistrationFormProps {
  handleClose: () => void;
}

const RegistrationForm = ({handleClose}: RegistrationFormProps) => {

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const isLoading = useAppSelector((state) => selectIsAuthLoading(state, AuthOperations.register));

  const { control, formState: { errors, isValid }, handleSubmit, watch } = useForm<RegistrationData>({
    resolver: yupResolver(getRegistrationValidationSchema()),
    mode: 'onTouched',
    values: {
      [RegistrationItems.email]: '',
      [RegistrationItems.name]: '',
      [RegistrationItems.password]: '',
      [RegistrationItems.passwordConfirmation]: '',
    }
  });

  const data = watch();

  const submit = useCallback(
    (data: RegistrationData) => {
      dispatch(apiPostRegister({
        body: filter(compose(not, isEmpty) ,omit([RegistrationItems.passwordConfirmation], data)),
        onSuccess: () => {
          enqueueSnackbar(t('registration:registered'), {variant: 'success'});
        }
      }));
    },
    [dispatch, enqueueSnackbar]
  );

  const handleClick = useCallback(
    () => {
      submit(data);
    },
    [dispatch, enqueueSnackbar, data]
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid md={6} xs={12}>
          <Controller
            name={RegistrationItems.email}
            control={control}
            defaultValue={data.email}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label={t('labels:email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <Controller
            name={RegistrationItems.name}
            control={control}
            defaultValue={data.name}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('labels:name')}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <Controller
            name={RegistrationItems.password}
            control={control}
            defaultValue={data.password}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label={t('labels:password')}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                type="password"
              />
            )}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <Controller
            name={RegistrationItems.passwordConfirmation}
            control={control}
            defaultValue={data.passwordConfirmation}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label={t('labels:passwordConfirmation')}
                error={Boolean(errors.passwordConfirmation)}
                helperText={errors.passwordConfirmation?.message}
                type="password"
              />
            )}
          />
        </Grid>
        <Grid xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <LoadingButton
              disabled={!isValid}
              loading={isLoading}
              type="submit"
              variant="contained"
              onClick={handleClick}
              sx={{mr: 1}}
            >
              {t('labels:register')}
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

export default memo(RegistrationForm);
