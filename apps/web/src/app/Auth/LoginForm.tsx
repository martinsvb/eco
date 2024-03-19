import { memo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField } from '@mui/material';
import { apiPostLogin, useAppDispatch } from '@eco/redux';
import { LoginData, LoginItems, getLoginValidationSchema } from '@eco/types';
import { useLoginSuccess } from './useLoginSuccess';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  handleClose: () => void;
}

const LoginForm = ({handleClose}: LoginFormProps) => {

  const dispatch = useAppDispatch();

  useLoginSuccess(handleClose);

  const { t } = useTranslation();

  const { control, formState: { errors, isValid }, handleSubmit, watch } = useForm<LoginData>({
    resolver: yupResolver(getLoginValidationSchema()),
    mode: 'onChange',
    values: {
      [LoginItems.email]: '',
      [LoginItems.password]: ''
    }
  });

  const data = watch();

  const submit = useCallback((data: LoginData) => {
    dispatch(apiPostLogin(data));
  }, [dispatch]);

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
          <Button
            disabled={!isValid}
            type="submit"
            variant="contained"
            onClick={handleClick}
          >
            Login
          </Button>
          <Button
            variant="text"
            onClick={handleClose}
          >
            Close
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default memo(LoginForm);
