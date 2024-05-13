import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { map, pick } from 'ramda';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { routes, useMobilePortraitDetection } from '@eco/config';
import {
  apiPatchContent,
  apiPostContent,
  selectContent,
  selectIsContentsLoading,
  useAppDispatch,
  useAppSelector,
  useShallowEqualSelector
} from '@eco/redux';
import { ContentData, ContentItems, ApiOperations, ContentTypes } from '@eco/types';
import { getContentValidationSchema } from '@eco/validation';
import ControllerTextField from '../components/formControls/ControllerTextField';

interface ContentFormProps {
  type: ContentTypes;
}

const ContentForm = ({type}: ContentFormProps) => {

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { id } = useParams();

  const isMobilePortrait = useMobilePortraitDetection();

  const isLoading = useAppSelector(
    (state) => selectIsContentsLoading(state, type, id ? ApiOperations.edit : ApiOperations.create)
  );

  const { data } = useShallowEqualSelector((state) => selectContent(state, type));

  const values = useMemo(
    () => {
      return data ?
        map((item) => item || '', pick(
          [ContentItems.Title, ContentItems.Text],
          data
        )) as ContentData
        :
        {
          [ContentItems.Title]: '',
          [ContentItems.Text]: '',
        }
    },
    [data]
  );

  const {
    control,
    formState: { isValid },
    handleSubmit,
    watch
  } = useForm<ContentData>({
    resolver: yupResolver(getContentValidationSchema()),
    mode: 'onTouched',
    values
  });

  const formData = watch();

  const submit = useCallback(
    (body: ContentData) => {
      if (id) {
        dispatch(
          apiPatchContent({
            body,
            id,
            type,
            onSuccess: () => {
              enqueueSnackbar(t('content:updated'), {variant: 'success'});
            }
          })
        );
      }
      else {
        dispatch(
          apiPostContent({
            body,
            type,
            onSuccess: () => {
              enqueueSnackbar(t('content:created'), {variant: 'success'});
              navigate(routes.content[type].list);
            }
          })
        );
      } 
    },
    [dispatch, enqueueSnackbar, navigate, id, t, type]
  );

  const handleClick = useCallback(
    () => {
      submit(formData);
    },
    [submit, formData]
  );

  const handleClose = useCallback(
    () => {
      navigate(routes.content[type].list);
    },
    [navigate, type]
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container rowSpacing={2} columnSpacing={2} width={isMobilePortrait ? '100%' : 800}>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={ContentItems.Title}
            control={control}
            defaultValue={formData.title}
            fieldProps={{
              fullWidth: true,
              required: true,
              label: t('labels:title'),
              id: ContentItems.Title
            }}
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ControllerTextField
            name={ContentItems.Text}
            control={control}
            defaultValue={formData.text}
            fieldProps={{
              fullWidth: true,
              label: t('labels:text'),
              id: ContentItems.Text
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

export default ContentForm;
