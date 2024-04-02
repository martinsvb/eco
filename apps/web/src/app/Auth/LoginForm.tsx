import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField } from '@mui/material';
import { apiPostLogin, selectIsAuthLoading, useAppDispatch, useAppSelector } from '@eco/redux';
import { AuthOperations, LoginData, LoginItems } from '@eco/types';
import { getLoginValidationSchema } from '@eco/validation';
import { LoadingButton } from '@mui/lab';

interface LoginFormProps {
  handleClose: () => void;
}

const LoginForm = ({handleClose}: LoginFormProps) => {

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const isLoading = useAppSelector((state) => selectIsAuthLoading(state, AuthOperations.register));

  const { control, formState: { errors, isValid }, handleSubmit, watch } = useForm<LoginData>({
    resolver: yupResolver(getLoginValidationSchema()),
    mode: 'onTouched',
    values: {
      [LoginItems.email]: '',
      [LoginItems.password]: ''
    }
  });

  const data = watch();

  const submit = useCallback(
    (data: LoginData) => {
      dispatch(apiPostLogin(data));
    },
    [dispatch]
  );

  const handleClick = useCallback(
    () => {
      dispatch(apiPostLogin(data));
    },
    [dispatch, data]
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack>
        <Controller
          name={LoginItems.email}
          control={control}
          defaultValue={data.email}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{mb: 2}}
              required
              label={t('labels:email')}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name={LoginItems.password}
          control={control}
          defaultValue={data.password}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{mb: 2}}
              required
              label={t('labels:password')}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              type="password"
            />
          )}
        />
        <Stack direction="row" justifyContent="space-between">
          <LoadingButton
            disabled={!isValid}
            loading={isLoading}
            type="submit"
            variant="contained"
            onClick={handleClick}
          >
            {t('labels:login')}
          </LoadingButton>
          <Button
            variant="text"
            onClick={handleClose}
          >
            {t('labels:close')}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default memo(LoginForm);
