import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { compose, filter, isEmpty, map, not, pick } from 'ramda';
import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
import ControllerTextField from '../components/formControls/ControllerTextField';
import ControllerPhoneField from '../components/formControls/ControllerPoneField';
import { useMobilePortraitDetection } from '../hooks/useMobileDetection';

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

  const values = useMemo(
    () => {
      return user ?
        {
          ...map((item) => item || '', pick([UserItems.Name, UserItems.Email, UserItems.Phone], user)),
          [UserItems.PasswordOld]: '',
          [UserItems.Password]: '',
          [UserItems.PasswordConfirmation]: '',
        } as UserEditData
        :
        {
          [UserItems.Name]: '',
          [UserItems.Email]: '',
          [UserItems.Phone]: '',
          [UserItems.PasswordOld]: '',
          [UserItems.Password]: '',
          [UserItems.PasswordConfirmation]: '',
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

  const handleClick = useCallback(
    () => {
      submit(data);
    },
    [submit, data]
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
        <Grid md={6} xs={12}>
          <ControllerPhoneField
            name={UserItems.Phone}
            control={control}
            defaultValue={data.phone}
            fieldProps={{
              fullWidth: true,
              required: true,
              label: t('labels:phone'),
              id: UserItems.Email
            }}
          />
        </Grid>
        <Grid xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="changePasswordHeader"
            >
              <Typography>{t('labels:passwordChange')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid xs={12}>
                  <ControllerTextField
                    name={UserItems.PasswordOld}
                    control={control}
                    defaultValue={data.passwordOld}
                    fieldProps={{
                      label: t('labels:passwordOld'),
                      id: UserItems.PasswordOld,
                      type: 'password'
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <ControllerTextField
                    name={UserItems.Password}
                    control={control}
                    defaultValue={data.password}
                    fieldProps={{
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
                      label: t('labels:passwordConfirmation'),
                      id: UserItems.PasswordConfirmation,
                      type: 'password'
                    }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
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
