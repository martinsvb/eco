import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  selectContent,
  selectIsContentsLoading,
  setContentPreview,
  useAppDispatch,
  useAppSelector,
  useShallowEqualSelector
} from '@eco/redux';
import { ContentData, ContentItems, ApiOperations, ContentTypes } from '@eco/types';
import { getContentValidationSchema } from '@eco/validation';
import ControllerTextField from '../components/formControls/ControllerTextField';
import { useMobilePortraitDetection } from '../hooks/useMobileDetection';
import ControllerDateTimeField from '../components/formControls/ControllerDateTimeField';
import { useFormValues } from '../hooks/useFormValues';
import { useContentFormHandlers } from './useContentFormHandlers';
import ControllerEditor from '../components/editor/ControllerEditor';

interface ContentFormProps {
  type: ContentTypes;
}

const ContentForm = ({type}: ContentFormProps) => {

  const { t } = useTranslation();

  const { id } = useParams();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(
    (state) => selectIsContentsLoading(state, type, id ? ApiOperations.edit : ApiOperations.create)
  );

  const { data } = useShallowEqualSelector((state) => selectContent(state, type));

  const values = useFormValues<ContentData>(
    data,
    [ContentItems.Title, ContentItems.Text, ContentItems.DateTime],
    [ContentItems.DateTime]
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

  const { submit, handleClick, handleClose } = useContentFormHandlers(type, formData, id);

  const handlePreviewClick = useCallback(
    () => {
      dispatch(setContentPreview(true));
    },
    [dispatch]
  );

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(submit)}
    >
      <Stack
        px={2}
        my={1}
        width={isMobilePortrait ? '100%' : 800}
        direction="row"
        justifyContent="flex-end"
      >
        <Button
          id='content-preview-button'
          startIcon={<VisibilityIcon />}
          onClick={handlePreviewClick}
        >
          {t('labels:preview')}
        </Button>
      </Stack>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        width={isMobilePortrait ? '100%' : 800}
        mr={2}
      >
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
          <ControllerDateTimeField
            name={ContentItems.DateTime}
            control={control}
            defaultValue={formData.dateTime}
            fieldProps={{
              label: t('labels:dateTime'),
              id: ContentItems.DateTime
            }}
          />
        </Grid>
        <Grid xs={12}>
          <ControllerEditor
            name={ContentItems.Text}
            control={control}
            defaultValue={formData.text}
            fieldProps={{
              label: t('labels:text'),
              id: ContentItems.Text,
              editorDesign: {
                minHeight: !isMobilePortrait && [ContentTypes.Record].includes(type) ? '470px' : '170px',
              }
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
    </Stack>
  );
};

export default ContentForm;
