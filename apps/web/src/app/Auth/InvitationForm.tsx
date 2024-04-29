import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as qs from 'qs';
import { compose, filter, isEmpty, not, omit } from 'ramda';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { apiPatchInvitationFinished, selectIsAuthLoading, useAppDispatch, useAppSelector } from '@eco/redux';
import { AuthOperations, InvitationData, UserItems } from '@eco/types';
import { getInvitationValidationSchema } from '@eco/validation';
import ControllerTextField from '../components/formControls/ControllerTextField';
import { routes } from '@eco/config';

const InvitationForm = () => {

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const isLoading = useAppSelector((state) => selectIsAuthLoading(state, AuthOperations.register));

  const { search } = useLocation();

  const initData = qs.parse(search.substring(1)) as unknown as InvitationData;

  const { control, formState: { isValid }, handleSubmit, watch } = useForm<InvitationData>({
    resolver: yupResolver(getInvitationValidationSchema()),
    mode: 'onTouched',
    values: {
      [UserItems.Email]: initData[UserItems.Email] || '',
      [UserItems.Name]: initData[UserItems.Name] || '',
      [UserItems.Password]: '',
      [UserItems.PasswordConfirmation]: '',
    }
  });

  const data = watch();

  const submit = useCallback(
    async (data: InvitationData) => {
      await dispatch(apiPatchInvitationFinished({
        body: filter(compose(not, isEmpty), omit([UserItems.PasswordConfirmation], data))
      }));
      navigate(routes.content.task.list);
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
            name={UserItems.Email}
            control={control}
            defaultValue={data.email}
            fieldProps={{
              readOnly: true,
              required: true,
              label: t('labels:email'),
              id: UserItems.Email
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
              label: t('labels:name'),
              id: UserItems.Name
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
              id: UserItems.Password,
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
              id: UserItems.PasswordConfirmation,
              type: 'password'
            }}
          />
        </Grid>
        <Grid xs={12}>
          <Stack direction="row" justifyContent="end">
            <LoadingButton
              disabled={!isValid}
              loading={isLoading}
              type="submit"
              variant="contained"
              onClick={handleClick}
            >
              {t('labels:submit')}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(InvitationForm);
