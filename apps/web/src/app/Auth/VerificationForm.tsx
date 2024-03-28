import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { is } from 'ramda';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import {
  apiPostResend, apiPostVerify, selectRegistrationEmail, useAppDispatch, useShallowEqualSelector
} from '@eco/redux';
import { VerificationData, VerificationItems } from '@eco/types';
import { getVerificationValidationSchema } from '@eco/validation';

interface VerificationFormProps {
  handleClose: () => void;
}

const VerificationForm = ({handleClose}: VerificationFormProps) => {

  const dispatch = useAppDispatch();

  const email = useShallowEqualSelector(selectRegistrationEmail);

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const { control, formState: { errors, isValid }, handleSubmit, watch } = useForm<VerificationData>({
    resolver: yupResolver(getVerificationValidationSchema()),
    mode: 'onTouched',
    values: {
      [VerificationItems.otp]: '',
    } as unknown as VerificationData
  });

  const data = watch();

  const submit = useCallback(
    ({otp}: VerificationData) => {
      if (is(String, email)) {
        dispatch(apiPostVerify({
          body: {otp: Number(otp), email},
          onSuccess: () => {
            enqueueSnackbar(t('registration:verified'), {variant: 'success'});
          }
        }));
      }
    },
    [dispatch, enqueueSnackbar, email]
  );

  const handleClick = useCallback(
    () => {
      submit(data);
    },
    [dispatch, enqueueSnackbar, data, email]
  );

  const handleResend = useCallback(
    () => {
      if (is(String, email)) {
        dispatch(apiPostResend({
          body: {email},
          onSuccess: () => {
            enqueueSnackbar(t('registration:resent'), {variant: 'success'});
          }
        }));
      }
    },
    [dispatch, email]
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack>
        <Typography variant="body1" mb={2}>{t('registration:verificationInfo')}</Typography>
        <Controller
          name={VerificationItems.otp}
          control={control}
          defaultValue={data.otp}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{mb: 2}}
              required
              label={t('labels:otp')}
              error={Boolean(errors.otp)}
              helperText={errors.otp?.message}
            />
          )}
        />
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={handleResend}
          >
            {t('labels:resend')}
          </Button>
          <Box>
            <Button
              disabled={!isValid}
              type="submit"
              variant="contained"
              onClick={handleClick}
            >
              {t('labels:verify')}
            </Button>
            <Button
              variant="text"
              onClick={handleClose}
            >
              {t('labels:close')}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </form>
  );
};

export default memo(VerificationForm);
