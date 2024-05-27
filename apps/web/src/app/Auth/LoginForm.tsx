import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { apiPostLogin, selectIsAuthLoading, useAppDispatch, useAppSelector } from '@eco/redux';
import { AuthOperations, LoginData, UserItems } from '@eco/types';
import { getLoginValidationSchema } from '@eco/validation';
import ControllerTextField from '../components/formControls/ControllerTextField';

interface LoginFormProps {
  handleClose: () => void;
}

const LoginForm = ({handleClose}: LoginFormProps) => {

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const isLoading = useAppSelector((state) => selectIsAuthLoading(state, AuthOperations.register));

  const { control, formState: { isValid }, handleSubmit, watch } = useForm<LoginData>({
    resolver: yupResolver(getLoginValidationSchema()),
    mode: 'onTouched',
    values: {
      [UserItems.Email]: '',
      [UserItems.Password]: ''
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
        <ControllerTextField
          name={UserItems.Email}
          control={control}
          defaultValue={data.email}
          fieldProps={{
            sx: {mb: 2},
            required: true,
            label: t('labels:email')
          }}
        />
        <ControllerTextField
          name={UserItems.Password}
          control={control}
          defaultValue={data.password}
          fieldProps={{
            sx: {mb: 2},
            required: true,
            label: t('labels:password'),
            type: 'password'
          }}
        />
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
            {t('labels:login')}
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default memo(LoginForm);
