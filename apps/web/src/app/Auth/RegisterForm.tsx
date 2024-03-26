import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { omit } from 'ramda';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField } from '@mui/material';
import { apiPostRegister, useAppDispatch } from '@eco/redux';
import { RegisterData, RegisterItems } from '@eco/types';
import { getRegisterValidationSchema } from '@eco/validation';

interface RegisterFormProps {
  handleClose: () => void;
}

const RegisterForm = ({handleClose}: RegisterFormProps) => {

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { control, formState: { errors, isValid }, handleSubmit, watch } = useForm<RegisterData>({
    resolver: yupResolver(getRegisterValidationSchema()),
    mode: 'onChange',
    values: {
      [RegisterItems.email]: '',
      [RegisterItems.name]: '',
      [RegisterItems.password]: '',
      [RegisterItems.passwordConfirmation]: '',
    }
  });

  const data = watch();

  const submit = useCallback(
    (data: RegisterData) => {
      dispatch(apiPostRegister(omit([RegisterItems.passwordConfirmation], data)));
    },
    [dispatch]
  );

  const handleClick = useCallback(
    () => {
      dispatch(apiPostRegister(omit([RegisterItems.passwordConfirmation], data)));
    },
    [dispatch, data]
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container rowSpacing={4} columnSpacing={2}>
        <Grid md={6} xs={12}>
          <Controller
            name={RegisterItems.email}
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
            name={RegisterItems.name}
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
            name={RegisterItems.password}
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
            name={RegisterItems.passwordConfirmation}
            control={control}
            defaultValue={data.passwordConfirmation}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label={t('labels:passwordConfirmation')}
                error={Boolean(errors.passwordConfirmation)}
                helperText={errors.passwordConfirmation?.message}
                type="passwordConfirmation"
              />
            )}
          />
        </Grid>
        <Grid xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <Button
              disabled={!isValid}
              type="submit"
              variant="contained"
              onClick={handleClick}
              sx={{mr: 1}}
            >
              {t('labels:register')}
            </Button>
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

export default memo(RegisterForm);
