import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { compose, filter, isEmpty, not, pick } from 'ramda';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  apiPatchUser,
  selectUser,
  selectIsUsersLoading,
  useAppDispatch,
  useAppSelector,
  useShallowEqualSelector
} from '@eco/redux';
import { UserEditData, UserItems, ApiOperations } from '@eco/types';
import { getUserEditValidationSchema } from '@eco/validation';
import { gridFieldSettings } from '../helpers/fields';
import { AppAccordion, ControllerPhoneField, GridControllerTextField } from '../components';
import { useFormValues, useMobilePortraitDetection } from '../hooks';

const UserForm = () => {

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { id } = useParams();

  const isMobilePortrait = useMobilePortraitDetection();

  const isLoading = useAppSelector(
    (state) => selectIsUsersLoading(state, id ? ApiOperations.edit : ApiOperations.create)
  );

  const user = useShallowEqualSelector(selectUser);

  const values = useFormValues<UserEditData>(
    user ? pick([UserItems.Name, UserItems.Email, UserItems.Phone], user) : null,
    [
      UserItems.Name,
      UserItems.Email,
      UserItems.Phone,
      UserItems.Password,
      UserItems.PasswordConfirmation,
      UserItems.PasswordOld
    ]
  );

  const { control, formState: { isValid }, handleSubmit, watch } = useForm<UserEditData>({
    resolver: yupResolver(getUserEditValidationSchema()),
    mode: 'onTouched',
    values
  });

  const data = watch();

  const submit = useCallback(
    (data: UserEditData) => {
      if (id) {
        const items = [
          UserItems.Name,
          UserItems.Email,
          UserItems.Phone,
          UserItems.Password,
          UserItems.PasswordOld
        ] as readonly (keyof UserEditData)[];
        const body = filter(compose(not, isEmpty), pick(items, data));
        if (!isEmpty(body)) {
          dispatch(
            apiPatchUser({
              body,
              id,
            })
          );
        }
      }
    },
    [dispatch, id]
  );

  const handleClose = useCallback(
    () => {
      navigate(-1);
    },
    [navigate]
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container rowSpacing={2} columnSpacing={2} width={isMobilePortrait ? '100%' : 800}>
        <GridControllerTextField
          {...gridFieldSettings({md: 6, xs: 12}, control, UserItems.Name, data)}
          fieldProps={{
            autoComplete: 'username',
            required: true,
            label: t('labels:name')
          }}
        />
        <GridControllerTextField
          {...gridFieldSettings({md: 6, xs: 12}, control, UserItems.Email, data)}
          fieldProps={{
            autoComplete: 'email',
            required: true,
            label: t('labels:email')
          }}
        />
        <Grid md={6} xs={12}>
          <ControllerPhoneField
            name={UserItems.Phone}
            control={control}
            defaultValue={data.phone}
            fieldProps={{
              required: true,
              label: t('labels:phone'),
              id: UserItems.Email
            }}
          />
        </Grid>
        <Grid xs={12}>
          <AppAccordion
            id="changePasswordHeader"
            title={t('labels:passwordChange')}
          >
            <Grid container rowSpacing={2} columnSpacing={2}>
              <GridControllerTextField
                {...gridFieldSettings({xs: 12}, control, UserItems.PasswordOld, data)}
                fieldProps={{
                  autoComplete: 'current-password',
                  label: t('labels:passwordOld'),
                  type: 'password'
                }}
              />
              <GridControllerTextField
                {...gridFieldSettings({md: 6, xs: 12}, control, UserItems.Password, data)}
                fieldProps={{
                  autoComplete: 'new-password',
                  label: t('labels:password'),
                  type: 'password'
                }}
              />
              <GridControllerTextField
                {...gridFieldSettings({md: 6, xs: 12}, control, UserItems.PasswordConfirmation, data)}
                fieldProps={{
                  autoComplete: 'new-password',
                  label: t('labels:passwordConfirmation'),
                  type: 'password'
                }}
              />
            </Grid>
          </AppAccordion>
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
            >
              {id ? t('labels:edit') : t('labels:create')}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(UserForm);
