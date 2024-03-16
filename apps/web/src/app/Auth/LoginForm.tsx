import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, TextField } from '@mui/material';
import { apiPostLogin, useAppDispatch } from '@eco/redux';
import { LoginData, LoginItems, getLoginValidationSchema } from '@eco/types';

export const LoginForm = () => {

  const dispatch = useAppDispatch();

  const { control, formState: { errors, isValid }, watch } = useForm<LoginData>({
    resolver: yupResolver(getLoginValidationSchema()),
    mode: 'onChange',
    values: {
      [LoginItems.email]: '',
      [LoginItems.password]: ''
    }
  });

  const data = watch();

  const handleSubmit = useCallback(
    () => {
      dispatch(apiPostLogin(data));
    },
    [dispatch, data]
  );

  return (
    <Stack>
      <Controller
        name={LoginItems.email}
        control={control}
        defaultValue={data?.email || ''}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{mb: 2}}
            required
            label="Email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name={LoginItems.password}
        control={control}
        defaultValue={data?.password || ''}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{mb: 2}}
            required
            label="password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        )}
      />
      <Button
        disabled={!isValid}
        variant="contained"
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Stack>
  );
};
