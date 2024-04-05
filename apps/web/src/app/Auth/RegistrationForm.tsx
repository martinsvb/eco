import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { compose, filter, isEmpty, not, omit } from 'ramda';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { apiPostRegister, selectIsAuthLoading, useAppDispatch, useAppSelector } from '@eco/redux';
import { AuthOperations, RegistrationData, RegistrationItems } from '@eco/types';
import { getRegistrationValidationSchema } from '@eco/validation';
import ControllerTextField from '../components/formControls/ControllerTextField';

interface RegistrationFormProps {
  handleClose: () => void;
}

const RegistrationForm = ({handleClose}: RegistrationFormProps) => {

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const isLoading = useAppSelector((state) => selectIsAuthLoading(state, AuthOperations.register));

  const { control, formState: { isValid }, handleSubmit, watch } = useForm<RegistrationData>({
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
          <ControllerTextField
            name={RegistrationItems.email}
            control={control}
            defaultValue={data.email}
            fieldProps={{
              required: true,
              label: t('labels:email'),
              id: RegistrationItems.email
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={RegistrationItems.name}
            control={control}
            defaultValue={data.name}
            fieldProps={{
              label: t('labels:name'),
              id: RegistrationItems.name
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={RegistrationItems.password}
            control={control}
            defaultValue={data.password}
            fieldProps={{
              required: true,
              label: t('labels:password'),
              id: RegistrationItems.password,
              type: 'password'
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={RegistrationItems.passwordConfirmation}
            control={control}
            defaultValue={data.passwordConfirmation}
            fieldProps={{
              required: true,
              label: t('labels:passwordConfirmation'),
              id: RegistrationItems.passwordConfirmation,
              type: 'password'
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
