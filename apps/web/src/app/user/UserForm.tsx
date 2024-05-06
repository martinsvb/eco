import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { compose, filter, isEmpty, map, not, pick } from 'ramda';
import { Button, Stack, Theme, useMediaQuery } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import CurrencyList from 'currency-list'
import { useSnackbar } from 'notistack';
import {
  apiPatchUser,
  apiPostUser,
  selectUser,
  selectIsUsersLoading,
  useAppDispatch,
  useAppSelector,
  useShallowEqualSelector
} from '@eco/redux';
import { UserEditData, UserItems, ApiOperations, UserRoles } from '@eco/types';
import { getUserEditValidationSchema } from '@eco/validation';
import { routes } from '@eco/config';
import ControllerTextField from '../components/formControls/ControllerTextField';

const UserForm = () => {

  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { id } = useParams();

  const isMobilePortrait = useMediaQuery((theme: Theme) => {
    return `${theme.breakpoints.down('sm')} and (orientation: portrait)`;
  });

  const isLoading = useAppSelector(
    (state) => selectIsUsersLoading(state, id ? ApiOperations.edit : ApiOperations.create)
  );

  const user = useShallowEqualSelector(selectUser);

  const values = useMemo(
    () => {
      return user ?
        map((item) => item || '', pick([UserItems.Name, UserItems.Email], user)) as UserEditData
        :
        {
          [UserItems.Name]: '',
          [UserItems.Email]: '',
          [UserItems.Role]: UserRoles.None,
        }
    },
    [user]
  );

  const { control, formState: { isValid }, handleSubmit, watch } = useForm<UserEditData>({
    resolver: yupResolver(getUserEditValidationSchema()),
    mode: 'onTouched',
    values
  });

  const data = watch();

  const submit = useCallback(
    (data: UserEditData) => {
      const items = [UserItems.Name, UserItems.Email, UserItems.Role] as readonly (keyof UserEditData)[];
      const body = filter(compose(not, isEmpty), pick(items, data));
      if (id) {
        dispatch(
          apiPatchUser({
            body,
            id,
          })
        );
      }
      else {
        dispatch(
          apiPostUser({
            body
          })
        );
      }
    },
    [dispatch, enqueueSnackbar, navigate, id]
  );

  const handleClick = useCallback(
    () => {
      submit(data);
    },
    [dispatch, enqueueSnackbar, data]
  );

  const handleClose = useCallback(
    () => {
      navigate(routes.users);
    },
    [navigate]
  );

  const currencies = CurrencyList.getAll();

  const language = i18n.language.includes('-') ? i18n.language.split('-')[0] : i18n.language;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container rowSpacing={2} columnSpacing={2} width={isMobilePortrait ? '100%' : 800}>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={UserItems.Name}
            control={control}
            defaultValue={data.name}
            fieldProps={{
              fullWidth: true,
              required: true,
              label: t('labels:name'),
              id: UserItems.Name
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={UserItems.Email}
            control={control}
            defaultValue={data.email}
            fieldProps={{
              fullWidth: true,
              required: true,
              label: t('labels:email'),
              id: UserItems.Email
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
              {id ? t('labels:edit') : t('labels:create')}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(UserForm);
